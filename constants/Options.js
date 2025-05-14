export const SelectTrvelersList=[
  {
    id:1,
    title:'Just Me',
    desc:'A sole traveles in exploration',
    icon:'✈️',
    prople:'1'
  },

  {
    id:2,
    title:'A Couple',
    desc:'Two travels in tendem',
    icon:'🍻',
    people:'2'
  },

  {
    id:3,
    title:'Family',
    desc:'A group of fun loving adv',
    icon:'🏡',
    people:'3 to 5'
  },

  {
    id:4,
    title:'Friends',
    desc:'A bunch of thrill-seekes',
    icon:'🚤',
    people:'5 to 10'
  }
]
 

export const SelectBudgetOptions=[
  {
      id:1,
      title:'Cheap',
      desc:'Stay conscious of costs',
      icon:'💵',
  },
  {
      id:2,
      title:'Moderate',
      desc:'Keep cost on the average',
      icon:'💰',
  },
  {
      id:3,
      title:'Luxury',
      desc:'Do not worry about costs',
      icon:'🤑',
  },

]


export const AI_PROMPT='Generate Travel Plane for Location : {destination} from {currentLocation},for {totalDays} Days and {totalNights} Night for {traveler} with a {budget} budget with a Flight details, Flight Price with Booking url,Hotels options list with maximum 10 hotels with Hotel N ame, Hotel address, Price, Hotel image url, geo cordinates, rating, descriptions and Places to visit nearby with place name, place details, place image url, geo cordinates ,ticket pricing, time to travel each of the location for {totalDays} days and {totalNights} night with each day plan with best time to visit to visit in JSON format.You have to plan for me so select all data by own except provided one.Provide data entered by user at last along with destinition image.Give each information and cover all days and plan places for every day except last one.' 

export const AI_SCHOOL_PROMPT = `
You are an expert in Indian education directories.

Find up to 10 real, existing schools (preferably CBSE board) in or near {location} that are suitable for a {age}-year-old {gender} student with {disability}.
78
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

 