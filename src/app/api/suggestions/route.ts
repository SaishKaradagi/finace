// import { NextResponse } from "next/server";
// import { Configuration, OpenAIApi } from "openai";
// import { getServerSession } from "next-auth/next";
// import FinancialSnapshot from "@/models/FinancialSnapshot";

// export async function GET() {
//   try {
//     const snapshot = await FinancialSnapshot.findOne().sort({ createdAt: -1 });

//     if (!snapshot) {
//       return NextResponse.json(
//         { error: "No financial data found" },
//         { status: 404 }
//       );
//     }

//     const configuration = new Configuration({
//       apiKey: process.env.OPENAI_API_KEY,
//     });
//     const openai = new OpenAIApi(configuration);

//     // Prepare the financial data for analysis
//     const monthlyExpenses = {
//       utilities: snapshot.expenses.utilities,
//       housing: snapshot.expenses.housing,
//       food: snapshot.expenses.food,
//       transportation: snapshot.expenses.transportation,
//       other: snapshot.expenses.other,
//     };

//     const prompt = `
//       As a financial advisor, analyze this monthly expense data and provide 3 specific, actionable suggestions for improvement. Format in JSON.
//       Monthly income: $${snapshot.annualIncome / 12}
//       Current savings: $${snapshot.currentSavings}
//       Monthly expenses:
//       ${JSON.stringify(monthlyExpenses, null, 2)}

//       Provide response in this JSON format:
//       {
//         "suggestions": [
//           {
//             "category": "category name",
//             "insight": "specific insight",
//             "action": "specific action",
//             "potentialSavings": "estimated monthly savings"
//           }
//         ]
//       }
//     `;

//     const completion = await openai.createChatCompletion({
//       model: "gpt-4",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are a financial advisor providing specific, actionable suggestions based on expense data.",
//         },
//         { role: "user", content: prompt },
//       ],
//     });

//     const suggestions = JSON.parse(completion.data.choices[0].message.content);
//     return NextResponse.json(suggestions);
//   } catch (error) {
//     console.error("Error generating suggestions:", error);
//     return NextResponse.json(
//       { error: "Failed to generate suggestions" },
//       { status: 500 }
//     );
//   }
// }
