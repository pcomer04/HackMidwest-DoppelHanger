# HackMidwest-AI-Clothing-Recommendation-WebApp
This is our project for hack midwest 2024
===============================================
# Welcome to Hack Midwest 2024!
<br /><br />


## Getting Started
Ensure you have reviewed the [Rules & FAQ](https://hackmidwest.com/#faq)
1. Clone this repository and rename to the name of your app or idea
2. Make it **private**
3. Add pr@kcitp.com as a user
4. Populate the Team, App & Challenges info below and update as needed

<br /><br />

## Who's on your team?
*List the full names,  email address & Github username of your teammates*

1.   Preston Ward || pward6@huskers.unl.edu || pward6
2.   Peyton Comer || pcomer2@huskers.unl.edu || pcomer04
3.   Charlie McIver || cmciver2@huskers.unl.edu || TheDevChuck
4.   Aidan McQueen || mcqueen@uark.edu || AMcQueen95

Desing Mock-Ups Created by Lindsey Johnson || ljohnson142@huskers.unl.edu || https://lindseymjohnson.myportfolio.com/stylesync

<br /><br />


## What is the name of your App?

DoppelHanger

<br /><br />
## What does your app do?
Our app is a stylist assistant that allows users to upload images to our website. The image is then processes by our AI model which finds the similarity between the user's image and images in our database. Outfits with the highest levels of similarity are displayed to the user.


<br /><br />


## What challenges are you building for? SELECT ALL THAT APPLY
*See hackmidwest.com/#prizes for challenge details*
- [ x ]  Pinata Challenge
- [ x ]  Pinata AI Challenge
- [ x ]  Pinata Enterprise Challenge
- [ ]  AWS Bedrock Challenge
- [ ]  Red Hat | Intel AI Challenge
- [ ]  Zoom Challenge
- [ ]  USDA Challenge
- [ ]  brAIn Rot Challenge

# Design Mock-Up
[Find Here]([doc:linking-to-pages#anchor-links](https://xd.adobe.com/view/f5150eab-ac7f-4cd8-993f-e3d1b15afdde-a046/))

# requirements
1. install libraries:
   - pip install torchvision
   - pip install torch
   - pip install openai-clip
   - pip install pillow
2. in the clip.py file, replace:
```
with urllib.request.urlopen(url) as source, open(download_target, "wb") as output:
```
with:

```
import ssl 
context = ssl._create_unverified_context()
with urllib.request.urlopen(url, context=context) as source, open(download_target, "wb") as output:
```

 

<br /><br />
>>>>>>> 505a0394d1c0e6dcb555aa53ea0e3bb120a9bf24
