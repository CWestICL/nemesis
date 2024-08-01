# 0.Title

## GODS OF FATE{.center}

### ROLE PLAYING GAMEBOOK{.center}

**Hark, adventurer!** This is a test file for a *Gods of Fate* adventure. Make sure you [read this section on how to play](0.a.Rules).

If you've already read the rules and prepared a character sheet, [begin your adventure here](1.Start)!

# 0.a.Rules
## GODS OF FATE{.center}
### HOW TO PLAY{.center .underline}

#### WHAT YOU WILL NEED

* A blank character sheet
* A pencil and eraser (unless using an electronic character sheet)
* A standard set of polyhedral RPG dice including the following:
	- D4
	- D6
	- D8
	- D10
	- D12 (The **FIGHT** die)
	- D20 (The **SKILL** die)

Ideally, if you have them, you can use two sets of distinct dice. This will allow you to roll for both yourself and any contested roll (such as an opposing monster) at the same time and easily tell between the two results. If you do only have one set of dice, make sure you have a notepad handy to write down any results that need to be compared with a future roll.

>*Note: Standard ''D10'' dice have the values 0-9 printed on them. For the sake of this game, when a 0 is rolled, the value is actually considered to be 10.*

Now that you have a blank character sheet and a set of dice, you can begin your adventure by creating your hero.

---
#### CREATING A CHARACTER

First thing’s first, give your adventurer a name in the ***'Name'*** field at the top of your character sheet.

Your character has 5 main abilities that they will be relying on throughout the quest. They are as follows:

* **MIGHT**: Your physical prowess. This ability will determine how well your adventurer can perform feats of athletic skill, their fighting strength, and how much damage they can take before succumbing to injury.

* **MAGIC**: Your knowledge and skill relating to the arcane arts. This ability will determine how well your adventurer can identify and use magical items, as well as casting spells.

* **SNEAK**: Your agility and dexterity when trying to remain undetected. This ability will determine how well your adventurer can sneak through areas without alerting monsters or springing traps. This ability also determines how well your adventurer performs sleight of hand when picking locks or stealing items from others.

* **CHARM**: Your social presence and general likeability. This ability will determine how well your adventurer can conversate, persuade and talk their way out of trouble with anyone they come across.

* **FLUKE**: The extent of which the *Gods of Fate* smile upon you. This ability will determine how lucky your adventurer is in times of potential danger and misfortune. This ability can also be actively called upon during combat to sway a fight in your favour.

When creating your character, you have 4 die types to assign to your abilities, the  **D4**, **D6**, **D8** and **D10**.  Assign each of these die types to the abilities of your choice. The maximum value of the die you assign to each ability is the **Ability Score** for that ability. The higher your **Ability Score** is, the better chance you have at succeeding when using that ability. The ability that you did not assign a die type to gets a score of 0. Note down the **Ability Score** for each of your abilities on your character sheet.

> *Example:*
> 
>*Dirk Thunderguns, the smooth-talking Barbarian, is a pretty capable fighter who is blessed by the gift of the gab. However, he has very little coordination and absolutely no interest in magic. When deciding his ability scores, he assigns the **D10** to **CHARM**, the **D8** to **MIGHT**, the **D6** to **FLUKE** and the **D4** to **SNEAK'**. This leaves an **Ability Score** of 0 for **MAGIC**.*

The small box in the corner of each ability field is to keep a record of the **Initial Ability Score**. This score will not change throughout the adventure. The larger section of the ability field is used to record the current **Ability Score**, which may change at certain points in your adventure.

---

Once you have familiarised yourself with the rules and have filled out your character sheet, you may [begin your adventure here](1.Start)!

Good luck, and may the *Gods of Fate* smile upon you...

# 1.Start

## GODS OF FATE{.center}
### THE STORY{.center .underline}

This is the opening passage of the story.

Without any other suitable points of entry, [you make your way towards the sloped descent](2.Entrance).

# 2.Entrance

You find an open archway guarded by an imposing green creature. He appears to be asleep, but they have a tight grip on their halberd.

If you want to take the guard by surprise and attack, [go here2](.a.EntranceCombatSurprise).

If you want to try and sneak past the guard, [go here](2.b.EntranceSneak).

If you want to wake the guard and ask them about the stronghold, [go here](2.c.EntranceTalk).

# 2.a.EntranceCombatSurprise

⚠️

You swing your sword at the sleeping guard.

You must fight the **Stronghold Guard (MIGHT: D4 / Health: 3)**!

If you win this encounter, [go here](2.a.EntranceCombatWin).

You may attempt to **Flee** this fight. If you successfully **Flee**, [go here](2.a.EntranceCombatFlee).

If you lose this encounter, [go here](2.a.EntranceCombatLose).

{comabt(might=4, health=3, flee=true, win_pass='2.a.EntranceCombatWin', lose_pass='2.a.EntranceCombatLose', flee_pass='2.a.EntranceCombatFlee')}

# 2.a.EntranceCombatWin

You deal the killing blow.

You find **2 gold coins** on their person.

Add the **Gold** to your character sheet and [venture further into the dark cavern ahead](3.FirstFork).

{addGold(gold=2)}

# 2.a.EntranceCombatLose

The guard's halberd delivers the final blow. This is where your adventure ends.

Create a new hero and [try again here](1.Start).

# 2.a.EntranceCombatFlee

You manage to duck and weave the creature’s attacks.

'Fine by me' the creature's voice echoes through the cavern. 'A runt like you isn't going to get very far anyway!'

You [continue down the cavern](3.FirstFork).

# 2.b.EntranceSneak

You decide to sneak by the creature and into the cavern ahead.

Make a **SNEAK (10)** roll!

If you succeed, [go here](2.b.EntranceSneakSucc).

If you fail, [go here](2.b.EntranceSneakFail).

{abilityRoll(ability=sneak, target=10, success_pass='2.b.EntranceSneakSucc', fail_pass='2.b.EntranceSneakFail')}

# 2.b.EntranceSneakSucc

The guard continues to sleep soundly as you tiptoe past.

Ready yourself and [continue down the dark cavern](3.FirstFork).

# 2.b.EntranceSneakFail

⚠️

You muster all the concentration you can to sneak past the sleeping guard, but you don't notice the pile of empty ration cartons by your feet. You accidentally topple them over.

As the creature brandishes their weapon, [you have no choice but to fight](2.b.EntranceCombat).

# 2.b.EntranceCombat

⚠️

You must fight the **Stronghold Guard (MIGHT: D4 / Health: 4)**!

If you win this encounter, [go here](2.a.EntranceCombatWin).

You may attempt to **Flee** this fight. If you successfully **Flee**, [go here](2.a.EntranceCombatFlee).

If you lose this encounter, [go here](2.a.EntranceCombatLose).

{comabt(might=4, health=4, flee=true, win_pass='2.a.EntranceCombatWin', lose_pass='2.a.EntranceCombatLose', flee_pass='2.a.EntranceCombatFlee')}

# 2.c.EntranceTalk

You grasp the creature's shoulder and shake them awake. You attempt to talk the guard down in the hopes that they'll give you some information.

Make a **CHARM (14)** roll!

If you succeed, [go here](2.c.EntranceTalkSucc).

If you fail, [go here](2.c.EntranceTalkFail).

{abilityRoll(ability=charm, target=14, success_pass='2.c.EntranceTalkSucc', fail_pass='2.c.EntranceTalkFail')}

# 2.c.EntranceTalkSucc

'You are a brave one' the creature chuckles as they slap you on the shoulder with surprising force. 'Brave, or stupid! I'll tell you what, since I don't think you'll be getting very far anyway, I'll give you this advice.

'Never eat yellow snow.

'Got that? Now scram before I change my mind!'

You thank the creature for their advice and [make your way into the gloomy depths of the cavern ahead](3.FirstFork).

# 2.c.EntranceTalkFail

⚠️

You infuriate the creature further and they swing their weapon at you in frustration.

**Take 1 point of damage**.

{takeDamage(damage=1)}

The guard isn't done with you. [You have no choice but to fight the creature](2.b.EntranceCombat).

3.FirstFork

You venture further into the pitch-black cavern. You follow the passageway until you approach a junction.

If you want to turn left and head down the western passage, [go here](End).

If you want to pull a torch from the wall and head down the eastern passage, [go here](End).

# End

This is the end. [Start again?](0.Title)
