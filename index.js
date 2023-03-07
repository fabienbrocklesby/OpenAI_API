require('dotenv').config()
const express = require('express');

const { Configuration, OpenAIApi } = require("openai");

const app = express();

app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/ask', async (req, res) => {
    const prompt = req.body.prompt;
    try {
        if (prompt == null) {
            throw new Error("Uh oh, no prompt was provided");
        }

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
        });
        
        const completion = response.data.choices[0].text;
        
        return res.status(200).json({
            success: true,
            message: completion,
        });
    } catch (error) {
        console.log(error.message);
    }
});  

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
