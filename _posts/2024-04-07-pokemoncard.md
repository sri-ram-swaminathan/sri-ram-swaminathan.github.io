---
title: "Pokemon Card Generator"
categories:
  - Technical
tags:
    - Pokemon
    - Harvard CS50 Python 
---

Growing up, I had a Pokemon card collection. The very good cards were hard to come by and it was near impossible to catch them all ! Now however .. :) I can finally complete my collection (well sort of).

![Card](/assets/img/pokemon/1.jpg)
A card created using my code !

I made this as part of my final project for [CS50 Python](https://cs50.harvard.edu/python/2022/). The input prompt looks as follows. After selecting either option the appropriate card is created in ~10 seconds. If the user is unsure, then a random pokemon of their requested type is generated.

![Main Menu](/assets/img/pokemon/2.jpg)
The code in action

I use support from [pokeapi](https://pokeapi.co/), [pillow](https://pillow.readthedocs.io/en/stable/) and [pokebase](https://github.com/PokeAPI/pokebase) in the project. The main logic works on 3 functions. All these functions accept string inputs.

```
def pokemon_finder(type):  
    try:  
        # load the data from the website  
        data = requests.get(f"https://pokeapi.co/api/v2/type/{type}").json()  
        # find the list of pokemons for that type and pick a random one  
        n = len(data["pokemon"])  
        name_i = data["pokemon"][random.randint(0, n)]["pokemon"]["name"]  
        return name_i  
    # handles invalid types  
    except ValueError:  
        return False
```

-   **pokemon_finder(type)** : It accepts one pokemon type as input. It then loads all the data of that particular type from the pokeapi website as a json file. It then returns the name of a random pokemon of that particular type.

```
def pokemon_image(pokemon_i):  
    try:  
        # load the data from the pokemon's website  
        data = requests.get(pokemon_i.url).json()  
        # find the pokemon's first type  
        type = data["types"][0]["type"]["name"]  
        # make a new image object, and import the correct base image  
        card = Image.open(f"./base/{type}.png")  
        card = card.convert("RGBA")  
        # extract the pokemon's image  
        pic = requests.get(pokemon_i.sprites.front_default).content  
        # convert it into an Image object  
        image = Image.open(BytesIO(pic))  
        image = image.convert("RGBA")  
        image = image.resize((345, 228))  
        # paste this image in the correct location and size  
        card.paste(image, (39, 63), image)  
        card.save("card.png")  
        return True  
    # handles pokemon that don't exist  
    except KeyError:  
        return False
```
-   **pokemon_image(pokemon_i) :** It accepts a pokemon’s name as input. It finds out the pokemon’s type and opens the corresponding (empty) card. It extracts the default pokemon sprite and pastes it on the card. It then saves the card as a png.

```
def pokemon_writer(pokemon_i):  
    try:  
        # collect some parameters from the pokemon object  
        name_w = pokemon_i.name  
        weight_w = pokemon_i.weight  
        id_w = pokemon_i.id  
        height_w = pokemon_i.height  
        # collect some paramaters from the website  
        data = requests.get(pokemon_i.url).json()  
        type_w = data["types"][0]["type"]["name"]  
        hp_w = data["stats"][0]["base_stat"]  
        n = len(data["moves"])  
        moves_1 = data["moves"][random.randint(0, n)]["move"]["name"]  
        moves_2 = data["moves"][random.randint(0, n)]["move"]["name"]  
        # collect the weakness and resistances  
        data = requests.get(f"https://pokeapi.co/api/v2/type/{type_w}").json()  
        weakness = data["damage_relations"]["double_damage_from"][0]["name"]  
        try:  
            resistance = data["damage_relations"]["no_damage_from"][0]["name"]  
            resistance_image = Image.open(f"./symbols/{resistance}.png")  
            resistance_image = resistance_image.convert("RGBA")  
            resistance_image = resistance_image.resize((20, 20))  
        # handle pokemon that aren't resistant to any type  
        except IndexError:  
            resistance_image = Image.open(f"./symbols/blank.png")  
            resistance_image = resistance_image.convert("RGBA")  
            resistance_image = resistance_image.resize((20, 20))  
        # convert the weakness and resistance to images  
        weakness_image = Image.open(f"./symbols/{weakness}.png")  
        weakness_image = weakness_image.convert("RGBA")  
        weakness_image = weakness_image.resize((20, 20))  
        type_image = Image.open(f"./symbols/{type_w}.png")  
        type_image = type_image.convert("RGBA")  
        type_image = type_image.resize((20, 20))  
        card = Image.open("card.png")  
        draw = ImageDraw.Draw(card)  
        # setting up required fonts  
        font1 = ImageFont.truetype("./fonts/decotura.ttf", 28)  
        font2 = ImageFont.truetype("./fonts/decotura.ttf", 20)  
        font3 = ImageFont.truetype("./fonts/Arialn.ttf", 14)  
        # write the required parameters, in black and save the changes  
        draw.text((100, 22), name_w, font=font1, fill=(0, 0, 0))  
        draw.text((328, 32), f"HP {hp_w}", font=font2, fill=(0, 0, 0))  
        draw.text(  
            (140, 290),  
            f"NO.{id_w} HT:{height_w}' WT:{weight_w} lbs.",  
            font=font3,  
            fill=(0, 0, 0),  
        )  
        card.paste(type_image, (40, 381), type_image)  
        draw.text((65, 378.5), moves_1, font=font2, fill=(0, 0, 0))  
        card.paste(type_image, (40, 423), type_image)  
        draw.text((65, 420.5), moves_2, font=font2, fill=(0, 0, 0))  
        card.paste(weakness_image, (47, 513), weakness_image)  
        card.paste(resistance_image, (124, 513), resistance_image)  
        card.save("card.png")  
        return True  
    # handles pokemon that don't exist  
    except AttributeError:  
        return False
```

-   **pokemon_writer(pokemon_i) :** It accepts a pokemon’s name as input. It then extracts the name, weight, height, id, type and hp. It extracts 2 random moves from the pokemon’s arsenal (no 2 cards will be entirely the same, even of the same pokemon !). It then finds out the pokemon’s weakness and resistance (if any) and converts them to images. As a final step it sets the fonts and writes out all this information onto the card that was saved last time.

And just like that we go from a string input to a pokemon card png ! I had lots of fun and learnt to work with json files and images in Python. While this is a good project, there is still room for improvement, in particular :

-   The final card produced does not show the damage that each attack deals (a crucial feature of pokemon cards), a feature that was missing with pokeAPI. A description of the move is also missing.
-   The hp of the pokemon is different from the one shown in the actual pokemon cards.
-   The stage of the pokemon’s evolution along with the previous stage’s (if exists) sprite is mising.
-   Small descriptions(text) of the pokemon are missing.
-   The program also takes about 5–10 seconds to run. I want to reduce the run time.

The entire source code for the project can be found [here](https://github.com/sri-ram-swaminathan/CS50P-Final-Project).

A short YouTube tutorial can be found [here](https://m.youtube.com/watch?si=c2cu77NYoDbCvqvn&v=7vTrzvf29ZI&feature=youtu.be).

P.S. : When I run this code on CS50’s codespace (online), it works. When I try to run it on my local machine, I’m running into a few errors. I would appreciate it a lot if you could help me fix this (that way I can add instructions to run this code on any system ) 😄
