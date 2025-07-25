
import { Client, Databases, ID } from "appwrite"

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
  .setProject(process.env.APPWRITE_PROJECT_ID || "")

const databases = new Databases(client)

export async function submitContactForm(formData: FormData) {
  try {
    // Extract form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Validate form data
    if (!name || !email || !subject || !message) {
      return { success: false, message: "All fields are required" }
    }

    // Save to Appwrite database
    const response = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID || "",
      process.env.APPWRITE_COLLECTION_ID || "",
      ID.unique(),
      {
        name,
        email,
        subject,
        message,
        createdAt: new Date().toISOString(),
      },
    
    )

    return {
      success: true,
      message: "Your message has been sent successfully! I will get back to you soon.",
      data: response,
    }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return {
      success: false,
      message: "There was an error sending your message. Please try again later.",
    }
  }
}
