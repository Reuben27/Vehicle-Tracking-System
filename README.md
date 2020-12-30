# Vehicle-Tracking-System

## What it does?

Tracks the buses on the campus in real time and showcases it on a web app.

Initial try can be viewed here:- https://reuben27.github.io/Vehicle-Tracking-System/Tracker.html

## How it does what it does?

- The Live-location.ino file send the current location to the thinkspeak .....

- The Tracker.js file displays the map with the current location of the bus at its center using google maps javascript api. It then sends a request and reads the data from the database after a specified time interval. It then updates the marker on the google map and removes the previous one. This process is repeated everytime a new location is read.

## Team Members

- [Reuben Devanesan](https://github.com/Reuben27)

- [Rishabh Gupta](https://github.com/Rishabhji24)

- [Tarun Sharma](https://github.com/tarun2001sharma)

- [Anurag Kurle](https://github.com/27Anurag)