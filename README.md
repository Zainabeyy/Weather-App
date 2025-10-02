# Frontend Mentor - Weather app solution

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49).

## Table of contents

- [Overview](#overview)
  - [Features](#Features)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### Features

Users should be able to:

- Search for weather information by entering a location in the search bar
- Show live location search suggestions with country flags while typing in the search bar
- View current weather conditions including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- see UV index, visibility, and air pressure data
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between different days of the week using the day selector in the hourly forecast section
- Toggle between Imperial and Metric measurement units via the units dropdown 
- Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Show weather for the user’s current location on first visit using geolocation detection
- Add a favorites system where users can save and quickly access frequently checked locations
- Show sunrise/sunset times with visual indicators
- Search using microphone input
- Toggle between dark and light themes
- Automatically switch to dark theme at night and light theme in the morning if the user hasn’t manually selected a theme
- Add Progressive Web App (PWA) capabilities for installation on mobile and desktop devices
- Improve tab navigation for better keyboard accessibility
- Share a link to a searched city so others can view the same city weather results
- View how harmful the current UV index is with color-coded text indicators

Comparison page

- Enter two cities to view their weather data
- Get search suggestions for both cities
- Use voice search for city input
- Compare weather data side by side in a table
- Compare temperature, humidity, wind, precipitation, visibility, and UV inde
- View a chart showing 7-day temperature changes for both cities

- tested using [pageSpeed](https://pagespeed.web.dev/)

### Links

- Solution URL: https://github.com/Zainabeyy/Weather-App
- Live Site URL: https://weather-app-nu-three-32.vercel.app

## My process

### Built with

- [Next.js](https://nextjs.org/) – React framework  
- [Tailwind CSS](https://tailwindcss.com/) – Styling  
- [TypeScript](https://www.typescriptlang.org/) – Type safety  
- [next-themes](https://github.com/pacocoursey/next-themes) – Theme management  
- [Recharts](https://recharts.org/) – Data visualization  
- [Framer Motion](https://www.framer.com/motion/) – Animations  
- [lucide-react](https://lucide.dev/) – Icons  
- [@ducanh2912/next-pwa](https://www.npmjs.com/package/@ducanh2912/next-pwa) – PWA support  

### API used

- open-meteo - weather data
- flagsapi - to get flags
- geocoding-api - latitude & longitude 

### What I learned

- I learned how to use graphs in websites for data comparison.  
- I learned that it’s possible to add a voice search feature without using any external API.  
- I also learned that the `next-pwa` package is only suitable for single-page websites. When my project only had one page, it worked fine, but after adding a second page, it started giving errors during the `npm run build` command. After debugging, I found that the issue was caused by `next-pwa`. I uninstalled it and switched to `@ducanh2912/next-pwa`, which worked perfectly. For multi-page websites, the `@ducanh2912/next-pwa` package is a better choice.
- How to use a weather API.

### Continued development

I want to focus more on SSR, SSG, and other rendering techniques in my future projects. I also want to improve page speed. I would like to use the voice search feature in my other websites as well, and I would also like to create more PWA apps. I also want to improve my scores on pageSpeed test for mobile screen size.

## Author

- Frontend Mentor - [@Zainabeyy](https://www.frontendmentor.io/profile/Zainabeyy)
- LinkedIn - [@Zainab Azeem](https://www.linkedin.com/in/zainab-eyy/)

## Acknowledgments

When I first started this project, I thought I couldn’t add additional features. But thanks to the Frontend Mentor community sharing their projects, I gained a lot of courage and motivation, and I ended up adding almost all of these features.
