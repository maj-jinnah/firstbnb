// 'use server'

// import { signIn } from "@/auth";

// export async function loginUsingCredentials(formData){
//     try {
//         const response = await signIn('credentials', {
//             email: formData.get('email'),
//             password: formData.get('password'),
//             redirect: false,
//         });

//         return response;
//     } catch (error) {
//         console.log(error);
//         throw new Error(error);
//     }
// }

// 'use server'

// import { signIn } from "@/auth";

// export async function loginUsingCredentials(formData) {
//     try {
//         const response = await signIn('credentials', {
//             email: formData.get('email'),
//             password: formData.get('password'),
//             redirect: false,
//         });

//         // If login failed, response will have `error` property
//         if (response?.error) {
//             console.log("Login failed:", response.error);
//             return { success: false, error: response.error };
//         }

//         return { success: true };
//     } catch (error) {
//         console.error("Unexpected error during login:", error);
//         return { success: false, error: "Something went wrong. Please try again later." };
//     }
// }


// 'use server'

// import { signIn } from "@/auth";

// export async function loginUsingCredentials(formData) {
//   try {
//     const response = await signIn('credentials', {
//       email: formData.get('email'),
//       password: formData.get('password'),
//       redirect: false,
//     });

//     if (response?.error) {
//       return { success: false, error: "Invalid credentials" };
//     }

//     return { success: true };
//   } catch (error) {
//     // Check if it's a known Auth.js error
//     if (error?.message?.includes("CredentialsSignin")) {
//       return { success: false, error: "Invalid credentials" };
//     }

//     // Unknown/unexpected error
//     console.error("Login error:", error);
//     return { success: false, error: "Something went wrong. Please try again later." };
//   }
// }


// 'use server';

// import { signIn } from "@/auth";

// export async function loginUsingCredentials(formData) {
//   try {
//     const response = await signIn('credentials', {
//       email: formData.get('email'),
//       password: formData.get('password'),
//       redirect: false,
//     });

//     // If signIn does not throw but returns an error
//     if (response?.error) {

//       return { success: false, error: "Invalid credentials" };
//     }

//     return { success: true };

//   } catch (error) {
//     // ✅ Detect Auth.js known error type
//     if (error?.message?.includes("CredentialsSignin")) {

//       return { success: false, error: "Invalid credentials" };
//     }

//     // 🔴 Unexpected error
//     // console.log("catch block not if block error:", error);
//     // console.error("Unexpected login error:", error);
//     return { success: false, error: "Something went wrong. Please try again later." };
//   }
// }



// 'use server';

// import { signIn } from "@/auth";

// export async function loginUsingCredentials(formData) {
//   try {
//     const response = await signIn('credentials', {
//       email: formData.get('email'),
//       password: formData.get('password'),
//       redirect: false,
//     });

//     // When credentials are invalid, signIn still resolves but with error
//     if (response?.error) {
//       return { success: false, error: "Invalid credentials" };
//     }

//     return { success: true };

//   } catch (error) {
//     // 🔥 Check for Auth.js-specific error from thrown object
//     const message = error?.message || "";
//     if (message.includes("CredentialsSignin")) {
//       return { success: false, error: "Invalid credentials" };
//     }

//     // Unexpected error
//     console.error("Unexpected login error:", error);
//     return { success: false, error: "Something went wrong. Please try again later." };
//   }
// }


// 'use server';

// import { signIn } from "@/auth";

// export async function loginUsingCredentials(formData) {
//   try {
//     const response = await signIn('credentials', {
//       email: formData.get('email'),
//       password: formData.get('password'),
//       redirect: false,
//     });

//     // When credentials are invalid, signIn still resolves but with error
//     if (response?.error) {
//       return { success: false, error: "Invalid credentials" };
//     }

//     return { success: true };

//   } catch (error) {
//     // 🔥 Check for Auth.js-specific error from thrown object
//     const message = error?.message || "";
//     if (message.includes("CredentialsSignin")) {
//       return { success: false, error: "Invalid credentials" };
//     }

//     // Unexpected error
//     console.error("Unexpected login error:", error);
//     return { success: false, error: "Something went wrong. Please try again later." };
//   }
// }


// 'use server';

// import { signIn } from "@/auth";

// export async function loginUsingCredentials(formData) {
//   try {
//     const response = await signIn('credentials', {
//       email: formData.get('email'),
//       password: formData.get('password'),
//       redirect: false,
//     });

//     if (response?.error) {
//       // Optional: Also catch if it fails silently
//       return { success: false, error: "Invalid credentials" };
//     }

//     return { success: true };

//   } catch (error) {
//     // ✅ Check by code or type
//     if (error?.code === 'credentials' || error?.type === 'CredentialsSignin') {
//       return { success: false, error: "Invalid credentials" };
//     }

//     // 🔴 Fallback for unexpected error
//     console.error("Unexpected login error:", error);
//     return { success: false, error: "Something went wrong. Please try again later." };
//   }
// }


// 'use server';

// import { signIn } from "@/auth";

// export async function loginUsingCredentials(formData) {
//   try {
//     const response = await signIn('credentials', {
//       email: formData.get('email'),
//       password: formData.get('password'),
//       redirect: false,
//     });

//     // If Auth.js returns an error response (without throwing)
//     if (response?.error) {
//       return { success: false, error: "Invalid credentials" };
//     }

//     return { success: true };

//   } catch (error) {
//     const message = error?.message;

//     // Handle custom thrown errors from authorize()
//     if (message === "UserNotFound") {
//       return { success: false, error: "No account found with this email." };
//     }

//     if (message === "InvalidPassword") {
//       return { success: false, error: "Incorrect password." };
//     }

//     if (message === "MissingCredentials") {
//       return { success: false, error: "Please provide both email and password." };
//     }

//     // Default Auth.js credentials error
//     if (error?.code === 'credentials' || error?.type === 'CredentialsSignin') {
//       return { success: false, error: "Invalid credentials" };
//     }

//     // Catch-all for unexpected issues
//     console.error("Unexpected login error:", error);
//     return { success: false, error: "Something went wrong. Please try again later." };

//     // return { success: false, error: "invalid credentials" };
//   }
// }


'use server';

import { signIn } from "@/auth";

export async function loginUsingCredentials(formData) {
  try {
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (response?.error) {
      return { success: false, error: "Invalid credentials" };
    }

    return { success: true };

  } catch (error) {
    // Unwrap error.cause to get custom error from `authorize()`
    const cause = error?.cause;
    const causeMessage = cause?.message;

    if (causeMessage === "UserNotFound") {
      return { success: false, error: "No account found with this email." };
    }

    if (causeMessage === "InvalidPassword") {
      return { success: false, error: "Incorrect password." };
    }

    if (causeMessage === "MissingCredentials") {
      return { success: false, error: "Please provide both email and password." };
    }

    // Fallback for all other Auth.js errors
    if (error?.type === 'CallbackRouteError') {
      return { success: false, error: "Invalid credentials" };
    }

    console.error("Unexpected login error:", error);
    return { success: false, error: "Something went wrong. Please try again later." };
  }
}




