import OpenAI from 'openai';
const client = new OpenAI({
  baseURL: 'https://router.huggingface.co/v1',
  apiKey: process.env.HUGGING_FACE,
});

export const Message = async (req, res) => {
  const { goals, frequency, height, age, weight } = req.body;
  const response = await client.chat.completions.create({
    model: 'deepseek-ai/DeepSeek-V3-0324',
    messages: [
      {
        role: 'system',
        content: `You are a fitness coach who is given a users goals for working out.
        - Generate a 6-day workout plan that works with their frequency goal of ${frequency} days and their fitness goal: ${goals}
        - Use the user's information such as the given age: ${age}, height: ${height} and weight: ${weight}
        - Include workout names, sets, and rep amount
        - Include an instruction link for each exercise in the case that the user is new to working out
        

        Always return your responses in the following JSON format. Don't say anything before or after the JSON:
        {
        "day": "Day 1",
        "exercises": [
          { "name": "Squat", "sets": 4, "reps": 10, "link": "https://example.com/squat" }
        ]
        }
        `,
      },
      {
        role: 'user',
        content: 'Please generate the workout plan.',
      },
    ],
  });

  console.log(response.choices[0].message.content);
  return res.json({ result: response.choices[0].message.content });
};
