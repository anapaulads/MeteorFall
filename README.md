MeteorFall ☄
Access the live simulation: [https://meteor-fall.vercel.app/](https://meteor-fall-git-main-morpheu-capitulinos-projects.vercel.app?_vercel_share=6luvd5datbKGyfxBp5M7zjfsWAwdWF2p)
About The Project
MeteorFall was born as a solution for the NASA Space Apps Challenge, with the goal of transforming complex astronomical data into a visually impactful and accessible simulation. Our platform explores the "what if?" scenario, allowing anyone to understand the magnitude of an asteroid impact event anywhere in the world.

However, our true differentiator lies in connecting the physical simulation to the human response. MeteorFall incorporates a civil defense layer that transforms the experience: instead of just observing the impact, the user receives a simulated emergency alert, complete with actionable safety protocols based on real contingency plans. This turns a complex astronomical event into a powerful lesson on preparedness, resilience, and decision-making.

Key Features
Real-time NASA Data: The list of asteroids is fed in real-time by NASA's Near-Earth Object (NEO) API.

Interactive 3D Globe: Utilizes CesiumJS to render a 3D globe where the user can select the exact impact location with a click or through a location search (via Google Places API).

Impact Calculation: The Python backend calculates the physical effects of the impact, including:

Crater diameter

Energy released (in Megatons)

Equivalent seismic magnitude

Educational Context: Translates the released energy into understandable equivalents, such as the number of Hiroshima or Tsar Bombs.

Civil Defense Alert: Simulates an emergency alert, educating the user on preparedness actions and safety protocols.

Impact Animation: Visualizes the meteor's trajectory and collision on the 3D globe for a more immersive experience.

Technologies Used
Frontend:
Vite: Modern frontend build tool.

JavaScript, HTML5, CSS3: The foundation of the web application.

CesiumJS: For 3D globe rendering and geospatial visualizations.

Google Places API: For the location search functionality.

Backend:
Python: Main language for calculations and the API.

Flask: Micro-framework for creating the REST API.

Gunicorn: WSGI server for production.

External APIs:
NASA Near-Earth Object Web Service: Provides asteroid data.

Deployment:
Vercel: Hosting platform for the application.
