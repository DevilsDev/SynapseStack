```mermaid
graph TD
    input["User Prompt"] --> E["OpenAI"]
    E --> V["Pinecone"]
    V --> L["OpenAI"]
    L --> output["Final Response"]
```