# Temporary WhatsApp Contact Form

## What will change
- Replace all current homepage content with one centered, aesthetically styled form and no page headline, logo, navigation, or footer.
- Keep all other existing pages unchanged and accessible through their current links.
- Add two required fields: **Name** and **District**.
- Add the requested note inside the form:
  > Please fill out this form and send. I am taking this data to save your contact number. I want to connect with you all. Congratulations for your selection in MBBS. Wish you a wonderful life ahead.
- Add a **Send** button that validates both fields and opens WhatsApp chat with **+91 93652 48667**.
- Pre-fill this message with the entered details:
  > Hi Ziaur Rahman Shahin. I am [Name] from [District]. You can save my contact.

## Technical details
- Encode the WhatsApp message safely before opening it.
- Trim both values, enforce reasonable length limits, and show clear validation messages for blank or invalid input.
- Use the existing semantic colors and form/button components, optimized for phones and desktops.
- Do not save any submitted details to the website database.
