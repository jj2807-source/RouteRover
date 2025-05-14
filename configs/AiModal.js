const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

  export const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
            role: "user",
            parts: [
              {text: "Generate Travel Plane for Location : Delhi from Mumbai ,for 4 Days and 3 Night for Just Me with a Luxury budget with a Flight details, Flight Price with Booking url,Hotels options list with maximum 10 hotels with Hotel Name, Hotel address, Price, Hotel image url, geo cordinates, rating, descriptions and Places to visit nearby with place name, place details, place image url, geo cordinates ,ticket pricing, time to travel each of the location for {totalDays} days and {totalNights} night with each day plan with best time to visit in JSON format.You have to plan for me so select all data by own except provided one .Also provide image of destination place at last and data entered by user as well.Give each information and cover all days and plan places for every day except last one.\n"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "```json\n{\n  \"tripDetails\": {\n    \"destination\": \"Delhi\",\n    \"origin\": \"Mumbai\",\n    \"duration\": {\n      \"days\": 4,\n      \"nights\": 3\n    },\n    \"travelerCount\": 1,\n    \"budget\": \"Luxury\",\n    \"flightDetails\": {\n      \"airline\": \"Air India\",\n      \"flightNumber\": \"AI 864\",\n      \"departureDate\": \"2024-03-15\",\n      \"departureTime\": \"10:00 AM\",\n      \"arrivalDate\": \"2024-03-15\",\n      \"arrivalTime\": \"12:00 PM\",\n      \"price\": 15000,\n      \"bookingUrl\": \"https://www.airindia.com/\"\n    },\n    \"hotelOptions\": [\n      {\n        \"name\": \"The Leela Palace New Delhi\",\n        \"address\": \"Chanakyapuri, New Delhi, Delhi 110021\",\n        \"price\": 30000,\n        \"imageUrl\": \"https://www.theleela.com/images/hotels/new-delhi/gallery/leela-palace-new-delhi-hotel-exterior.jpg\",\n        \"coordinates\": {\n          \"latitude\": 28.5893,\n          \"longitude\": 77.1981\n        },\n        \"rating\": 4.5,\n        \"description\": \"A luxurious five-star hotel offering stunning views of the city and world-class amenities.\"\n      },\n      {\n        \"name\": \"The Oberoi, New Delhi\",\n        \"address\": \"Dr. Zakir Hussain Marg, Diplomatic Enclave, Chanakyapuri, New Delhi, Delhi 110021\",\n        \"price\": 25000,\n        \"imageUrl\": \"https://www.oberoihotels.com/sites/default/files/styles/gallery_slider_large/public/images/hotel/delhi/oberoi-new-delhi-hotel-exterior-view.jpg?itok=X82B_g_J\",\n        \"coordinates\": {\n          \"latitude\": 28.5889,\n          \"longitude\": 77.1987\n        },\n        \"rating\": 4.8,\n        \"description\": \"An iconic hotel known for its impeccable service, elegant rooms, and prime location.\"\n      },\n      {\n        \"name\": \"The Imperial, New Delhi\",\n        \"address\": \"Janpath, Connaught Place, New Delhi, Delhi 110001\",\n        \"price\": 20000,\n        \"imageUrl\": \"https://www.theimperialindia.com/media/images/gallery/exterior_images/the-imperial-hotel-new-delhi.jpg\",\n        \"coordinates\": {\n          \"latitude\": 28.6317,\n          \"longitude\": 77.2192\n        },\n        \"rating\": 4.6,\n        \"description\": \"A historic hotel with a rich heritage, offering luxurious accommodations and fine dining options.\"\n      }\n    ],\n    \"itinerary\": [\n      {\n        \"day\": 1,\n        \"title\": \"Arrival in Delhi & Exploring Old Delhi\",\n        \"description\": \"Arrive at Indira Gandhi International Airport (DEL) and check into your luxury hotel. After settling in, embark on a guided tour of Old Delhi, visiting iconic landmarks like: \\n\\n* **Red Fort:** A UNESCO World Heritage Site, this magnificent fort is a testament to Mughal architecture. (Time: 2 hours)\\n* **Jama Masjid:** The largest mosque in India, offering a glimpse into the city's rich Islamic heritage. (Time: 1 hour)\\n* **Chandni Chowk:** A bustling market filled with vibrant shops, street food stalls, and historical buildings. (Time: 2 hours)\\n\\nEnjoy a delicious street food experience in Chandni Chowk before returning to your hotel for a relaxing evening.\",\n        \"places\": [\n          {\n            \"name\": \"Red Fort\",\n            \"details\": \"A UNESCO World Heritage Site and a symbol of Mughal power, the Red Fort is a massive complex of palaces, mosques, and gardens.\",\n            \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Red_Fort_Delhi.jpg/1200px-Red_Fort_Delhi.jpg\",\n            \"coordinates\": {\n              \"latitude\": 28.6560,\n              \"longitude\": 77.2359\n            },\n            \"ticketPricing\": \"₹10 for Indians, ₹200 for foreigners\",\n            \"timeToVisit\": \"2 hours\"\n          },\n          {\n            \"name\": \"Jama Masjid\",\n            \"details\": \"The largest mosque in India, known for its impressive architecture and intricate carvings.\",\n            \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Jama_Masjid_%28Delhi%29_-_Exterior_View_towards_the_East_%282011%29.jpg/1200px-Jama_Masjid_%28Delhi%29_-_Exterior_View_towards_the_East_%282011%29.jpg\",\n            \"coordinates\": {\n              \"latitude\": 28.6524,\n              \"longitude\": 77.2306\n            },\n            \"ticketPricing\": \"Free entry, but shoes must be removed\",\n            \"timeToVisit\": \"1 hour\"\n          },\n          {\n            \"name\": \"Chandni Chowk\",\n            \"details\": \"A vibrant market street filled with shops, street food stalls, and historical buildings.\",\n            \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Chandni_Chowk,_Delhi.jpg/1200px-Chandni_Chowk,_Delhi.jpg\",\n            \"coordinates\": {\n              \"latitude\": 28.6525,\n              \"longitude\": 77.2309\n            },\n            \"ticketPricing\": \"N/A\",\n            \"timeToVisit\": \"2 hours\"\n          }\n        ],\n        \"bestTime\": \"Morning\"\n      },\n      {\n        \"day\": 2,\n        \"title\": \"Exploring New Delhi & Heritage Sites\",\n        \"description\": \"Start your day with a visit to the majestic: \\n\\n* **Humayun's Tomb:** A UNESCO World Heritage Site, this impressive Mughal mausoleum inspired the design of the Taj Mahal. (Time: 2 hours)\\n\\nContinue your exploration by visiting: \\n\\n* **India Gate:** A war memorial dedicated to the Indian soldiers who died in World War I. (Time: 1 hour)\\n* **Qutub Minar:** A towering minaret and UNESCO World Heritage Site, showcasing Indo-Islamic architecture. (Time: 2 hours)\\n\\nSpend the evening at a traditional Indian restaurant, experiencing the flavors of Delhi cuisine.\",\n        \"places\": [\n          {\n            \"name\": \"Humayun's Tomb\",\n            \"details\": \"A UNESCO World Heritage Site and a beautiful example of Mughal architecture.\",\n            \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Humayuns_Tomb_DSC_0072.jpg/1200px-Humayuns_Tomb_DSC_0072.jpg\",\n            \"coordinates\": {\n              \"latitude\": 28.6129,\n              \"longitude\": 77.2181\n            },\n            \"ticketPricing\": \"₹25 for Indians, ₹500 for foreigners\",\n            \"timeToVisit\": \"2 hours\"\n          },\n          {\n            \"name\": \"India Gate\",\n            \"details\": \"A war memorial dedicated to the Indian soldiers who died in World War I.\",\n            \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/India_Gate_night.jpg/1200px-India_Gate_night.jpg\",\n            \"coordinates\": {\n              \"latitude\": 28.6130,\n              \"longitude\": 77.2296\n            },\n            \"ticketPricing\": \"Free entry\",\n            \"timeToVisit\": \"1 hour\"\n          },\n          {\n            \"name\": \"Qutub Minar\",\n            \"details\": \"A towering minaret and UNESCO World Heritage Site, showcasing Indo-Islamic architecture.\",\n            \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Qutub_Minar_and_its_complex_%28Delhi%29.jpg/1200px-Qutub_Minar_and_its_complex_%28Delhi%29.jpg\",\n            \"coordinates\": {\n              \"latitude\": 28.5841,\n              \"longitude\": 77.1732\n            },\n            \"ticketPricing\": \"₹40 for Indians, ₹600 for foreigners\",\n            \"timeToVisit\": \"2 hours\"\n          }\n        ],\n        \"bestTime\": \"Morning\"\n      },\n      {\n        \"day\": 3,\n        \"title\": \"Exploring Delhi's Culture & Shopping\",\n        \"description\": \"Start your day with a visit to the: \\n\\n* **National Museum:** Home to a vast collection of artifacts showcasing India's rich history and culture. (Time: 2 hours)\\n\\nImmerse yourself in the city's vibrant culture by visiting: \\n\\n* **Lotus Temple:** A stunning architectural marvel dedicated to the Baháʼí Faith. (Time: 1 hour)\\n\\nSpend the afternoon indulging in some luxury shopping at: \\n\\n* **Connaught Place:** A popular shopping destination offering a mix of designer boutiques, international brands, and local crafts. (Time: 2 hours)\\n\\nEnjoy a delicious dinner at one of Delhi's many fine dining restaurants.\",\n        \"places\": [\n          {\n            \"name\": \"National Museum\",\n            \"details\": \"Home to a vast collection of artifacts showcasing India's rich history and culture.\",\n            \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/National_Museum_Delhi.jpg/1200px-National_Museum_Delhi.jpg\",\n            \"coordinates\": {\n              \"latitude\": 28.6177,\n              \"longitude\": 77.2171\n            },\n            \"ticketPricing\": \"₹10 for Indians, ₹200 for foreigners\",\n            \"timeToVisit\": \"2 hours\"\n          },\n          {\n            \"name\": \"Lotus Temple\",\n            \"details\": \"A stunning architectural marvel dedicated to the Baháʼí Faith.\",\n            \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Lotus_Temple_Delhi_India_2012-10-27.jpg/1200px-Lotus_Temple_Delhi_India_2012-10-27.jpg\",\n            \"coordinates\": {\n              \"latitude\": 28.5531,\n              \"longitude\": 77.2589\n            },\n            \"ticketPricing\": \"Free entry\",\n            \"timeToVisit\": \"1 hour\"\n          },\n          {\n            \"name\": \"Connaught Place\",\n            \"details\": \"A popular shopping destination offering a mix of designer boutiques, international brands, and local crafts.\",\n            \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Connaught_Place_New_Delhi_India_July_2017.jpg/1200px-Connaught_Place_New_Delhi_India_July_2017.jpg\",\n            \"coordinates\": {\n              \"latitude\": 28.6328,\n              \"longitude\": 77.2183\n            },\n            \"ticketPricing\": \"N/A\",\n            \"timeToVisit\": \"2 hours\"\n          }\n        ],\n        \"bestTime\": \"Morning\"\n      },\n      {\n        \"day\": 4,\n        \"title\": \"Departure from Delhi\",\n        \"description\": \"Enjoy a leisurely breakfast at your hotel before checking out and heading to the airport for your flight back to Mumbai.\",\n        \"places\": [],\n        \"bestTime\": \"Morning\"\n      }\n    ]\n  },\n  \"destinationImage\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Delhi_skyline.jpg/1200px-Delhi_skyline.jpg\"\n}\n```\n\n**Please note:** This is just a sample itinerary. You can customize it to your preferences and interests. You can also use this information to find more specific information about each location, such as restaurants, attractions, and activities. \n\n**Important Reminders:**\n\n* Prices for flights, hotels, and attractions are subject to change.\n* Always book your flights and accommodation in advance, especially if you are traveling during peak season.\n* Be sure to check the visa requirements for India.\n* Pack appropriate clothing for the weather conditions in Delhi.\n* It is recommended to purchase travel insurance before your trip.\n* Respect local customs and traditions.\n* Be aware of your surroundings and take necessary precautions to protect yourself from theft and scams.\n\nEnjoy your trip to Delhi! \n"},
            ],
        },
    ],
  });

  // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  // console.log(result.response.text());
// Function to fetch top CBSE schools in Pune


export const getTopCBSESchoolsInPune = async () => {
 const CUSTOM_PROMPT = `
You are an expert in Indian education directories.

Find up to 10 real, existing schools (preferably CBSE board) in or near ${schoolSearchData?.location} that are suitable for a ${schoolSearchData?.age}-year-old ${schoolSearchData?.gender} student with ${schoolSearchData?.disability}.

For each school, return the following information in a JSON array format:
[
  {
    "name": "",
    "address": "",
    "board": "",
    "age_group_supported": "",
    "annual_fee": "",
    "contact_number": "",
    "website_url": "",
    "rating": 0-5,
    "image_url": "",
    "location": { "lat": 0.0, "lng": 0.0 },
    "reviews": [
      {
        "reviewer_name": "",
        "review_text": "",
        "rating": 0-5
      }
    ]
  }
]

Important:
- Use real Indian school names (avoid placeholders like "School 1").
- Do not add explanations, just return the JSON.
- Keep the response under 1500 words.
`;



  try {
    const result = await chatSession.sendMessage(query);
    const jsonResponse = result.response.text();

    console.log("CBSE School Search Response:", jsonResponse);

    return jsonResponse; // Or parse as JSON if you expect structured data
    // return JSON.parse(jsonResponse); // uncomment if sure Gemini returns pure JSON
  } catch (error) {
    console.error("Error fetching CBSE schools:", error);
    throw error;
  }
};
