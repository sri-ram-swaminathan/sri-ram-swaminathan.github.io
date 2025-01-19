---
title: "Neverlosen"
categories:
  - Technical
tags:
  - Football 
  - Data Visualization 
  - Bayer Leverkusen
---

![Celebration](/assets/img/neverlosen/1.jpg)
Xabi Alonso and co. celebrating the unbeaten Bundesliga title

[Bayer 04 Leverkusen](https://www.bayer04.de/en-us) (Leverkusen) had an impressive 2023–2024 season, arguably one of the most impressive seasons of football ever. They managed to win the [Bundesliga](https://www.bundesliga.com/en/bundesliga) and [DFB Pokal](https://www.dfb.de/en/dfb-pokal/) unbeaten (no losses, wins and draws only) ! To top it all off, they finished runners up in the [Europa League](https://www.uefa.com/uefaeuropaleague/) (their only loss in 53 matches). They were one win away from an unbeaten [treble](https://en.wikipedia.org/wiki/Treble_(association_football)). Their performance was a statistical outlier, by a large margin. In this post, I try to visualize some of their magic.

Here is some context before I start, Leverkusen are a professional football team playing in the first division of football in Germany, the Bundesliga. Besides this they also participated in the DFB Pokal Cup (a knock-out style league in Germany with teams from many different divisions) and the Europa League (second tier football competition with teams from all over Europe). Leverkusen are managed by [Xabi Alonso](https://en.wikipedia.org/wiki/Xabi_Alonso), a former player turned coach. He was appointed to Leverkusen on 5 October 2022.

Leverkusen’s achievement is impressive on it’s own. However, comparing it to something similar helps us understand it’s true significance. Going an entire season without losing a single match in football is quite rare, so there aren’t many examples to compare against. I chose to compare Leverkusen’s 2023–2024 season to [Arsenal’s 2003–2004](https://en.wikipedia.org/wiki/2003%E2%80%9304_Arsenal_F.C._season) season (Leverkusen were unbeaten in the Bundesliga and DFB Pokal, while Arsenal were unbeaten in the English Premier League).

In the graphic below I have represented the match results of both teams across all the competitions that they participated in. Each box represents an individual match result. The table progresses chronologically from left to right, i.e. the first box in the first row is match number 1 and the last box in that row is match number 10. The color coding is as follows : green → win \| gray → draw \| red → loss.

![Form](/assets/img/neverlosen/2.jpg)
Relative forms of the invincibles

Leverkusen played a total of 53 matches, compared to Arsenal’s 58. Leverkusen had 9 draws, 1 loss and 43 wins. Arsenal on the other hand had 14 draws, 6 losses and 38 wins. Leverkusen’s longest winning streak was 14 games and Arsenal’s was 10 games. I know that this isn’t a fair comparison for various reasons (time, location, budget, difficulty and many more). But even in the land of the invincibles, Leverkusen are no mean feat.

Another thing that can be compared is the value of Leverkusen’s squad. How valuable were their players, and how did they compare to the pack ?

![Squad value](/assets/img/neverlosen/3.jpg)
A few of the biggest clubs in world football

Compared to some of the biggest teams in Europe, Leverkusen’s squad is made up of inexpensive players. Their squad is worth 44% of Manchester City’s ! Leverkusen’s squad is worth about 60% of the average in this graphic.

This only adds to the astonishment. Not only did they win big, they did so with far fewer resources. Xabi Alonso had a roster which was a mix of young talent and experienced veterans, with an average age of 24.8. While Xabi had a few big name players, he was instrumental in producing talent, with most of the squad getting selected to play for their nations. Some of them even got picked for the first time this season (Jeremie Frimpong, Robert Andrich, Alex Grimaldo).

No comparison is finished without some introspection, so let’s see how Leverkusen did in the season before.

![Progress](/assets/img/neverlosen/4.jpg)
A look back at the season before

They secured 40 more points in the Bundesliga, an 80% increase, they did this with an increase in goal difference by 712.5% (notice that their goal difference in 23–24 is greater than their points in 22–23) ! They went 5 rounds further in the DFB Pokal, and ended up winning the competition. In the Europa League, they went 1 round further but sadly did not win it. They really outdid themselves.

Let’s take a closer look at their performance and understand the nature of their victories.

![Step by step](/assets/img/neverlosen/5.jpg)
Leverkusen’s performance match by match

In the above graphic the x axis represents the match number, ranging from 1–53. The positive y axis (blue in color) represents the number of goals that Leverkusen have scored in any particular match. The negative y axis (red in color) represents the number of goals that Leverkusen have conceded in the same match. **Note that this graphic is for all three competitions : Bundesliga, DFB Pokal and Europa League.**

Leverkusen scored a lot of goals, consistently (with a total of 144 goals), averaging 2.7 goals per game. There were only two matches where they failed to score (#28 and #52). Some notable victories along the way include scoring 8 goals in the first game of the season, beating Bayern Munich (home) 3–0 , beating RB Leipzig (away) 3–2 at the last minute, coming back 3–2 (against Qarabag FK) in extra time in the Europa League among many others. They also let in a lot lesser goals than they scored (42), resulting in a massive +102 goal difference !

A game of football lasts 90 minutes, and additional time. By dividing these 90 minutes into 15 minute bins we can understand when Leverkusen are most dangerous and most vulnerable.

![90 Minutes](/assets/img/neverlosen/6.jpg)
When do they score, and when do they concede ?

In the above graphic x axis represents the 15 minute bins of a football match. The positive y axis (blue in color) represents the number of goals that Leverkusen have scored in one time interval. The negative y axis (red in color) represents the number of goals that Leverkusen have conceded in the same time interval. **Note that this graphic is for all three competitions : Bundesliga, DFB Pokal and Europa League.**

As far as scoring is concerned, Leverkusen are more effective in the second half, scoring 60% (86 goals) of their goals in the second stage of the game. Aside from this they are fairly consistent throughout the game, scoring most (+5 goals from average) in the 60–75 minutes period. They have scored a total of 15 goals in second half added time (90–90+10 minutes), often times coming back from a disadvantage. To put it in context, some of the top players in world football scored those many goals that season (Bukayo Saka-16, Kai Havertz -13, Darwin Nunez-11, Bruno Fernandes, Rodrygo, Jamal Musiala-10)!

They also seem to concede most goals at the start of the first and second halves, maybe the defense needs some time to attain full focus. They mean all business towards the end of the game, not even conceding a single goal in the 90–90+10 minute range.

Let’s now turn our attention to the players who made such a feat possible. Who’s scoring all these goals ? Who played all the matches ? Who passes the best ?

**Note that the player graphics are only for their contributions in the Bundesliga.**

![Minutes](/assets/img/neverlosen/7.jpg)
Always on the pitch

![Score](/assets/img/neverlosen/8.jpg)
Goals, goals, goals

![Helper](/assets/img/neverlosen/9.jpg)
How may I assist you ?

![MVP](/assets/img/neverlosen/10.jpg)
Most valuable players

![Move It](/assets/img/neverlosen/11.jpg)
Precise passers

![No Nonsense](/assets/img/neverlosen/12.jpg)
No way through

![Intercept](/assets/img/neverlosen/13.jpg)
Where do you think you’re going ?

![Accuracy](/assets/img/neverlosen/14.jpg)
Keeping it on target

From the above graphics we can see who the top 5 players are, across various metrics. What is interesting to note is that Alex Grimaldo (#1 in goals + assists) and Jeremie Frimpong (#4 in goals + assists) are both defenders ! The top goal scorer is Victor Boniface, who spent about 3 months (~30% of the season) injured ! Notice that the top 5 passers are very very close in their accuracy (1.3% variation from #1-#5). In defense, Jonathan Tah stands tall, making 13 more blocks than the next in line.

While there are many standout players for Leverkusen this season, I think their biggest strength is their diversity and unity. They are able to work through injuries and cold feet alike, with 16 different goal scorers in 2023–2024 ! Their fast paced, goal-scoring & resilient style of play has made the difference in making such a remarkable season possible.

I hope you enjoyed reading this as much as I enjoyed writing it :D

I got the data for this project from [FBREF](https://fbref.com/en/), [TransferMarket](https://www.transfermarkt.co.in/) and [FotMob](https://www.fotmob.com/). The data set I compiled can be found [here](https://docs.google.com/spreadsheets/d/1NeNp6WoZ9U6v-b7ibxbjZMSmMt1XdmKDeEz-ngqx1HE/edit?usp=sharing).

P.S. If I could pick one defender, midfielder and attacker from this team it would be Alex Grimaldo, Granit Xhaka and Florian Wirtz. Do let me know who you would pick..
