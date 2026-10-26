# Video Gen App (React Native + Node)

Setup: see SETUP_GUIDE_HE.md (step by step, Hebrew).

Features: Wan + Seedance generation, characters (look/age/personality/voice), locations,
image library, start/end/reference images, download video, extract frame.

Architecture
- server/src/providers  one class per model (BaseProvider contract)
- server/src/utils/mode.js  picks text / frames / reference mode
- mobile/src/services   prompt building, image + media handling
- mobile/src/state + hooks  persistent data and generation lifecycle
- mobile/src/ui  components and screens only

To add a model: new class in server/src/providers, register in providers/index.js, add to config/models.js.
