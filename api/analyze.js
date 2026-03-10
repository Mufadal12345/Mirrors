// filename: api/analyze.js
// Vercel Serverless Function (Node.js) لتقييم الشخصية عبر AI

const { GoogleGenerativeAI } = require("@google/generative-ai");

export default async function handler(request, response) {
  // التحقق من نوع الطلب
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const { questions, responses, displayName } = request.body;

  // تحقق من البيانات
  if (!questions || !responses || !displayName) {
    return response.status(400).json({ error: 'Missing required data' });
  }

  // تحقق من وجود مفتاح الـ API آمنياً (GEMINI_API_KEY)
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    console.error('Missing GEMINI_API_KEY in Environment Variables');
    return response.status(500).json({ error: 'AI service misconfigured' });
  }

  // --- تجميع سياق الإجابات المجهولة للـ Prompt ---
  const formattedContext = responses.map((resp, index) => {
    let contextStr = `المشارك ${index + 1}:\n`;
    
    // الرسالة النصية المجهولة
    if (resp.anonymousMessage && resp.anonymousMessage.trim()) {
      contextStr += `- رسالة مجهولة: "${resp.anonymousMessage}"\n`;
    }

    // الإجابات على الأسئلة
    for (const [qId, value] of Object.entries(resp.answers)) {
      const question = questions.find(q => q.id === qId);
      if (!question) continue;

      if (question.type === 'slider') {
        contextStr += `- السؤال المقياس: "${question.text}"، الإجابة: ${value}/100\n`;
      } else if (question.type === 'multiple') {
        contextStr += `- سؤال الاختيار: "${question.text}"، الإجابة: "${value}"\n`;
      } else if (question.type === 'text') {
        contextStr += `- السؤال النصي المفتوح: "${question.text}"، الإجابة: "${value}"\n`;
      }
    }
    return contextStr;
  }).join('\n---\n');

  // --- بناء الـ Prompt المحترف والآمن ---
  const prompt = `
أنت خبير علم نفس وتحليل شخصية عربي احترافي، متخصص في التطوير الذاتي وتحليل الانطباعات المجهولة.

لقد قمت بجمع انطباعات وإجابات سرية ومجهولة من أصدقاء وعائلة شخص يدعى "${displayName}" عبر تطبيق ويب. البيانات مبنية على مقاييس، اختيارات متعددة، ورسائل نصية مفتوحة.

إليك البيانات التي تم جمعها (مقسمة حسب المشاركين):
${formattedContext}

مهمتك هي إعداد تقرير تحليل شخصية عميق، دقيق، ومشجع لـ ${displayName}. يجب أن يكون التقرير مكتوباً بلهجة عربية فصحى سلسة، احترافية، ومهذبة للغاية.

يجب أن يحتوي التقرير على الأقسام التالية (مقسمة بعناوين واضحة وبنفس الترتيب):

**1. المنظور العام للمحيطين**: ملخص سريع وموجز لكيف يراه أغلب الناس (السمات الأبرز).
**2. نقاط القوة البارزة**: تحليل لثلاث نقاط قوة رئيسية أجمع عليها المشاركون، مع أمثلة من الإجابات إذا أمكن.
**3. فرص النمو والتطوير الذاتي**: تحليل لثلاث نقاط قد تحتاج لتطوير (نقاط ضعف بأسلوب محفز)، بناءً على الإجابات المنخفضة في الـ Sliders أو الانتقادات في الرسائل، مع تقديم نصائح عملية للتطور.
**4. رسالة ختامية ملهمة**: كلمة تشجيعية نهائية لبناء الثقة والاستمرار في التطوير الذاتي.

اجعل التحليل مبنياً على البيانات المتاحة فقط، بلمسة إنسانية، وتجنب الكلمات الجارحة تماماً.
`;

  try {
    // تهيئة Gemini API
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // إرسال الطلب لـ Gemini
    const result = await model.generateContent(prompt);
    const apiResponse = await result.response;
    const analysisText = apiResponse.text();

    // إرسال التحليل النهائي للواجهة الأمامية
    return response.status(200).json({ analysis: analysisText });

  } catch (error) {
    console.error('Gemini API/Serverless Function Error:', error);
    return response.status(500).json({ error: 'Failed to get AI analysis' });
  }
}
