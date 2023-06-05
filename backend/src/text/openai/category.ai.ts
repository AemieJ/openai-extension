import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

// OpenAI configuration creation
const configuration = new Configuration({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

// OpenAI instance creation
const openai = new OpenAIApi(configuration);

export class Category {
  async categorize(text: string): Promise<string[]> {
    try {
      // Send a request to OpenAI
      const completion = await openai.createCompletion({
        prompt: `What is the category of the text: ${text}`,
        max_tokens: 150,
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        model: 'text-davinci-003',
      });

      // Response will be in that precise text, but you can explore the full object if you want to
      let res: any = completion.data.choices[0].text;
      res = res.split('\n');
      res = res.filter((txt) => txt.length > 0);
      return res;
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.status);
        console.error(error.response.data);
      } else {
        console.error(error.message);
      }
    }
  }
}
