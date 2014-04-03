---
layout: essay
title: Data Anti-patterns and Bad Philosophy
subtitle: On (Not) Modeling How We Know Things
author: Adam Michael Wood
---

Sometimes bad programming is just bad programming: people write sloppy code, people don't know how things are supposed to work, people forget that binary math is weird sometimes.

But often, bad programming is a result of bad philosophy - a fundamental misunderstanding of how meaning is made, or thought works, or how the world is structured. Sometimes the fault is a little less radical, tied to ignorance of some domain-specific facts, but often it's just plain bad philosophy.

And nowhere is bad philosophy more on display than in poorly designed data models. Most [database 'antipatterns'](http://www.amazon.com/gp/product/B00A376BB2/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B00A376BB2&linkCode=as2&tag=musforsun-20) are philosophical in nature.

This is, I think, not well understood by the majority of programmers and project managers. Even most engineers (read: technicians) who do things the right way can't always explain the philosophical underpinnings of the right way. This situation is analogous to high school students who know how to use the quadratic formula, but have no idea why it's meaningful. But while most of those bored teenagers move blissfully away from mathematics without doing anyone any serious harm, programmers without a sense of good philosophy (along with plenty of [theology and geometry](http://www.amazon.com/gp/product/0517122707/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0517122707&linkCode=as2&tag=musforsun-20)) move from project to project, wreaking havoc on database after database without any understanding of why things keep breaking. This situation is, of course, compounded by project managers, executives, and [pointy-haired bosses](http://www.amazon.com/gp/product/B007O8101E/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B007O8101E&linkCode=as2&tag=musforsun-20) of all stripes who don't rise to the level of software technician, and so don't even know what the right way is, let alone understand why there has to be a right way in the first place.

## The Canonic Example: How Old Are You?

If you are working on some legacy project, listening to some manager explain requirements, or looking a web form, and you see, hear, or smell any suggestion that a person's age is being stored in a database somewhere, I can predict with five-nines accuracy that somewhere along the way the database was heavily influenced by an idiot.

I assume you are aware that the correct piece of information to store about a person is not their age, but their birthday. Other than the fact that this is painfully obvious to anyone who thinks about it for more than a moment, what might we offer as a philosophical explanation of the right way, and how can we understand why so many people take the wrong path?

If we are forced to "show our work," there are at least two routes by which one can arrive at the "store birthdays, not ages."

### Understanding of Human Thought

The more obvious, and slightly less interesting, of the two routes involves an understanding of what a person does when asked the question, "How old are you?" or "How old is Socrates?" 

(Socrates is, of course, either the interviewee's child or pet.)

Typically, we do not walk around with the answer to this question readily available. Rather, we quickly calculate it:

"Let's see, I was born in 1982 and... what year is it? Oh right, so I'm... 31, I guess? Yeah - 31. I'll be 32 in July."

A well-designed data system would mirror this process almost exactly:
<pre>
    class Person
        .
        .
        .
            public method age {
                //um... what's my age again?
                bday = this.getBirthday();
                //and, uh.... what's the date today?
                today = getCurrentDate();
                //and so that makes me like, how old?
                age = Compare( bday, today);
                //yeah, definitely 31
                return age;
            }
</pre>
*Obviously, that is not at all how that would be coded in real life.*

We human beings store birthdays, not ages (unless you express your age in units of THIS MANY), so it is somewhat natural to do the same thing with databases an computer systems.

But, one could argue (one wouldn't) that human cognition is terribly inefficient, and that computers can and should do things differently.

Fair enough. So, let's look at the more interesting proof.

### God's Knowledge: Thomistic Data Structures

Your database is supposed to know everything, and always be right. But facts change. How can this be handled?!

Medieval philosophers had a similar, but much more fundamental question:
God knows everything, and is always right. Facts change. **But God cannot change.** How can God know about things if He doesn't change, but things do?

> **Whether the knowledge of God is variable?*
>
>Objection 1:
>It seems that the knowledge of God is variable. For knowledge is related to what is knowable. But whatever imports relation to the creature is applied to God from time, and varies according to the variation of creatures. Therefore the knowledge of God is variable according to the variation of creatures.
>
>[Thomas Aquinas, Summa Theologica, Pars Prima - Question 14, Article 15](http://home.newadvent.org/summa/1014.htm#article15)

This might seem silly, but it was a big deal at the time: If God's knowledge is variable, than God is variable (for God is Simple, and One). The whole edifice of belief might crumble if we imagine a God who just changes willy-nilly. (Not unlike a computer system that crashes from too many logical contradictions and inconsistencies.)

Moreover, like the issue of storing birthdays or ages, the question only seems silly now because an answer was provided which is so obvious and clear that once you have grokked it, you will wonder why you didn't think of it yourself.

(The following is Aquinas' reply to a later objection, but it is particularly relevant here.)

>The ancient Nominalists said that it was the same thing to say "Christ is born" and "will be born" and "was born"; because the same thing is signified by these three--viz. the nativity of Christ. Therefore it follows, they said, that whatever God knew, He knows; because now He knows that Christ is born, which means the same thing as that Christ will be born. This opinion, however, is false; both because the diversity in the parts of a sentence causes a diversity of enunciations; and because it would follow that a proposition which is true once would be always true; which is contrary to what the Philosopher lays down (Categor. iii) when he says that this sentence, "Socrates sits," is true when he is sitting, and false when he rises up. Therefore, it must be conceded that this proposition is not true, "Whatever God knew He knows," if referred to enunciable propositions. But because of this, it does not follow that the knowledge of God is variable. For as it is without variation in the divine knowledge that God knows one and the same thing sometime to be, and sometime not to be, so it is without variation in the divine knowledge that God knows an enunciable proposition is sometime true, and sometime false. The knowledge of God, however, would be variable if He knew enunciable things by way of enunciation, by composition and division, as occurs in our intellect. Hence our knowledge varies either as regards truth and falsity, for example, if when either as regards truth and falsity, for example, if when a thing suffers change we retained the same opinion about it; or as regards diverse opinions, as if we first thought that anyone was sitting, and afterwards thought that he was not sitting; neither of which can be in God.

Aquinas is explaining that some thing which is only true at a point in time is not known by God by way of the kind of knowledge expressed in present-tense statements, like "Socrates is sitting." 

This is precisely analogous to our database, where enunciating the individual facts "today I am 31; tomorrow I will be 32" is not proper to the way a database knows things.

## Models for Knowledge

While our database is in no way omniscient (unless you work for Google), it still makes sense (to me) that patterning knowledge using the highest form of rational thinking possible is the best practice. Occasionally, like the birthday example, we can look to a divine precedent for our data model.

At other times, we'll have to look to human reason (an image, though an imperfect one, of God), and at other times, some other way of knowing and organizing the world.


