# Pronunciation Skill

[GCP Function: https://us-central1-pronunciation-post-proc-skill.cloudfunctions.net/smPronounce](https://console.cloud.google.com/functions/details/us-central1/smPronounce?env=gen2&project=pronunciation-post-proc-skill)

## Description

The Pronunciation Skill can be included with any DDNA Studio project as a post-process skill. This skill enables the user to provide a list of words or phrases that require updating without making updates to the base NLP or Gen AI conversation. 

## Sample Skill Definition
```json
{
  "name": "POST_PROCESS PRONUNCIATION HELPER",
  "summary": "Create a list of words to update in post process",
  "description": "Create a list of words to update in post process",
  "isPublic": false,
  "status": "ACTIVE",
  "serviceProvider": "SKILL_API",
  "category": null,
  "endpointInitialize": null,
  "endpointSession": null,
  "endpointExecute": "https://us-central1-pronunciation-post-proc-skill.cloudfunctions.net/smPronounce",
  "endpointEndSession": null,
  "endpointEndProject": null,
  "endpointMatchIntent": null,
  "languages": null,
  "config": {
    "skillType": "POST_PROCESS",
    "configMeta": [
      {
        "name": "pronounceList",
        "type": "TEXT",
        "label": "List of pronunciation updates",
        "required": true
      }
    ]
  }
}
```

The skill definition creates an `pronounceList` input that allows you to paste a string of phrases and their replacements in the conversation. Phrase/Replacement pairs are delimited by a colon (`:`), while the individual words to replace are delimited by a dash (`-`).

ex: `Sentence : string - Stoll : @pronounce(Stoll, Stall)`

![](./images/skill-connect.png)

## Sample Request
```json
{
  "projectId": "ABC123",
  "deploymentEnvironment": "preview",
  "sessionId": "7600aff2-6ebd-44de-bcd2-1facd8ab4f29",
  "intent": {
    "name": "MY_INTENT",
    "confidence": 0
  },
  "text": "This is a sentence to demonstrate the post process pronunciation skill, developed by David Stoll at Soul Machines.",
  "config": {
    "pronounceList": "Sentence : string - Stoll : @pronounce(Stoll, Stall)"
  }
}
```
## Sample Response
```json
{
    "output": {
        "text": "This is a string to demonstrate the post process pronunciation skill, developed by David @pronounce(Stoll, Stall) at Soul Machines.",
        "variables": {}
    },
    "endConversation": false,
    "endRouting": false
}
```