import pandas as pd
import spacy

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Function to refactor ambiguous values in the dataset by removing the ambiguity
def refactor_ambiguous_values(df):
    refactored_df = df.copy()

    for col in refactored_df.columns:
        if pd.api.types.is_string_dtype(refactored_df[col]):
            refactored_df[col] = refactored_df[col].apply(disambiguate_text)

    return refactored_df

# Function to disambiguate text using spaCy
def disambiguate_text(text):
    # Tokenize text
    doc = nlp(text)
    
    # Example disambiguation logic (replace with your custom rules)
    disambiguated_text = []
    for token in doc:
        if token.pos_ == 'NOUN':
            # Example: Replace nouns with their base form
            disambiguated_text.append(token.lemma_)
        else:
            disambiguated_text.append(token.text)
    
    return ' '.join(disambiguated_text)

# Example usage:
# df = pd.DataFrame({'Text': ['This is clear', 'This is vague', 'Confusing text', 'Not sure']})
# refactored_df = refactor_ambiguous_values(df)
# print(refactored_df)
