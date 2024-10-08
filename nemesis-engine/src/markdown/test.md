# 0.Title

## GODS OF FATE{.center}

### ROLE PLAYING GAMEBOOK{.center}

This is a story file for testing the Nemesis Engine, a tool for rendering *Gods of Fate* Gamebook stories. 

[Check the rules page for text formatting demonstration](0.a.Rules).

Otherwise, [begin your adventure here](0.b.Mode)!

# 0.a.Rules
## GODS OF FATE{.center}
### TEXT FORMATTING DEMONSTRATION{.center .underline}

This is normal text. This is *italic* text. This is **bold** text. This is ***bold italic*** text.

These are the different header sizes.

>*Note: H1 elements are used to divide passages in the renderer. **Don't** use them in the story.*

## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
####### Heading 7 isn't a thing, silly!

* This is what a list looks like
* Cool huh?
* And it can be nested like this:
	- Wow!
	- Amazing!
	- Awesome!

>This is how quotes look.
>
>This is normal text. *This is italic text.* **This is bold text.** ***This is bold italic text.***

Now that you've seen how text can be formatted, you may [begin your adventure here](0.b.Mode)!

# 0.b.Mode

### GAME MODE{.center .underline}

{ModeMenu(exit_pass='0.c.CreateCharcter')}

# 0.c.CreateCharcter

### CREATE YOUR CHARACTER{.center .underline}

{CreateCharacter(exit_pass='1.Start')}

# 1.Start

## GODS OF FATE{.center}
### THE STORY{.center .underline}

This is the opening passage of the story.

To see how branching paths work, [you make your way into the room ahead](2.Entrance).

# 2.Entrance

You find yourself in the Hall of Testing.

If you test a **Danger** passage, [go here](2.a.Danger!).

If you want to test an **Ability Roll**, [go here](2.b.AbilityRoll).

If you want to test taking some **Gold**, [go here](2.c.Gold).

If you want to test taking an **Item**, [go here](2.d.Item).

If you want to test **Combat**, [go here](2.e.Combat).

If you want to test taking damage, [go here](2.f.Damage).

If you want to test a **Game Over**, [go here](2.g.GameOver).

If you want to test taking some **Treasure**, [go here](2.h.Treasure).

If you want to test taking a **Weapon**, [go here](2.i.Weapon).

If you want to test taking a **Cursed Item**, [go here](2.j.CursedItem).

If you want to test **Tempting Fate**, [go here](2.k.TemptFate).

# 2.a.Danger!

This is a **Danger** passage.

You shouldn't be able to use a **Potion** while in this passage.

To go back to the Hall of Testing, [go here](2.Entrance).

# 2.b.AbilityRoll

You decide to sneak past the monster.

{AbilityRoll(ability='sneak', target=10, success_pass='2.b.AbilityRollSucc', fail_pass='2.b.AbilityRollFail')}

To go back to the Hall of Testing, [go here](2.Entrance).

# 2.b.AbilityRollSucc

You were successful!

To go back to the Hall of Testing, [go here](2.Entrance).

# 2.b.AbilityRollFail

You failed!

To go back to the Hall of Testing, [go here](2.Entrance).

# 2.c.Gold

You find **2 gold coins** on their person.

{TakeGold(gold=2)}

To go back to the Hall of Testing, [go here](2.Entrance).

# 2.d.Item

You find a rusty old keyring laying in the dirt.

{TakeItem(name='Rusty Keyring')}

To go back to the Hall of Testing, [go here](2.Entrance).

# 2.e.Combat

You must fight the **Monster (MIGHT: D4 / Health: 3)**!

If you win this encounter, [go here](2.e.CombatWin).

You may attempt to **Flee** this fight. If you successfully **Flee**, [go here](2.e.CombatFlee).

If you lose this encounter, [go here](2.e.CombatLose).

{Comabt(might=4, health=3, flee=true, win_pass='2.e.CombatWin', lose_pass='2.e.CombatLose', flee_pass='2.e.CombatFlee')}

# 2.e.CombatWin

You won!

To go back to the Hall of Testing, [go here](2.Entrance).

# 2.e.CombatFlee

You fled!

To go back to the Hall of Testing, [go here](2.Entrance).

# 2.e.CombatLose

You lost!

To go back to the Hall of Testing, [go here](2.Entrance).

# 2.f.Damage

A piano suddenly drops on your head. Ouch!

**Take 1 point of damage**.

{TakeDamage(damage=1)}

To go back to the Hall of Testing, [go here](2.Entrance).

# 2.g.GameOver

You get shot with a gun and die.

Create a new hero and [try again here](1.Start).

{GameOver()}

To go back to the Hall of Testing, [go here](2.Entrance).

# 2.h.Treasure

You reach behind the corroded breastplate to pull out the gleaming object around the corpse's neck.

{TakeTreasure(name='Gold Necklace', gold=5)}

To go back to the Hall of Testing, [go here](2.Entrance).

# 2.i.Weapon

You stumble upon a discarded weapon by your feet.

You have found a **Silver Shortsword** that grants you a +3 **Attack Strength** bonus.

{TakeWeapon(name='Silver Shortsword', bonus='+3 AS')}

To go back to the Hall of Testing, [go here](2.Entrance).

# 2.j.CursedItem

You place the helmet on your head and a sharp pain shoots through your entire being.

It is a **Helm of Pain** and it is **Cursed**! You cannot take it off by normal means and while you wear it, your **MIGHT** die is demoted by one die type.

Record the item in the ***'Items'*** field on your character sheet, including its effect.

{TakeItem(name='Helm of Pain', auto=true, bonus='demote might 1')}

To go back to the Hall of Testing, [go here](2.Entrance).

# 2.k.TemptFate

A piano suddenly drops from above.

{TemptFate(lucky_pass='2.k.TemptFateLucky', unlucky_pass='2.k.TemptFateUnlucky')}

To go back to the Hall of Testing, [go here](2.Entrance).

# 2.k.TemptFateLucky

You were lucky!

To go back to the Hall of Testing, [go here](2.Entrance).

# 2.k.TemptFateUnlucky

You were unlucky!

To go back to the Hall of Testing, [go here](2.Entrance).