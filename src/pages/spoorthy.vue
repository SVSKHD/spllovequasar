<template>
  <typeWritter title="Spoorthy" />
  <GlassTabs v-model="tab" :tabs="tabs">
    <template #timeline>
      <timeline :events="events" color="secondary" @action="onAction" />
    </template>
    <template #memories>
      <div>
        <carousel :slides="slides" fit="contain" side-width="clamp(140px, 22vw, 320px)" />
      </div>
    </template>
    <template #Gifts>
      <VerticleTabsComponent
        v-model="verticleTab"
        :items="verticleTabs"
        :height="'800px'"
        :split-percent="24"
      />
    </template>
    <template #Tests>
      <div>
        <h2>Tests</h2>
        <p>Here you can find various tests related to our journey.</p>
      </div>
      <cup-tea />
    </template>
  </GlassTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import typeWritter from '../components/typeWritter.vue';
import GlassTabs from '../components/tabs.vue';
import VerticleTabsComponent from 'src/components/verticleTabs.vue';
import cupTea from 'src/components/cupTea.vue';
import timeline, {
  type TimelineItem,
  type TimelineAction,
  type TimelineHeading,
  type TimelineEntry,
} from 'src/components/timeline.vue';
import carousel, { type CarouselSlide } from 'src/components/imageCarousel.vue';
//images
// change these lines
import picAngry from 'assets/splvlovevc/splangry.png';
import picLove from 'assets/splvlovevc/splloveu.png';
import picHappy from 'assets/splvlovevc/splhappy.png';
import picSad from 'assets/splvlovevc/splsorrow.png';
import picLove2 from 'assets/splvlovevc/spllove2.png';
import picEmotional from 'assets/splvlovevc/splemotional.png';
import picKiss from 'assets/splvlovevc/splkiss.png';
import picChild from 'assets/splvlovevc/splchild.png';
import picchildhittu from 'assets/splvlovevc/hitchildhood.png';
import spltogether from 'assets/splvlovevc/spltogther.png';
import splflaunt from 'assets/splvlovevc/splfalunt.png';

const tab = ref('timeline');
const tabs = [
  { name: 'timeline', label: 'Timeline', icon: 'eva-eye-outline' },
  { name: 'memories', label: 'Memories', icon: 'eva-tv-outline' },
  { name: 'interesting', label: 'Interesting', icon: 'movie' },
  { name: 'Questions', label: 'Questions', icon: 'eva-mic-outline' },
  { name: 'Gifts', label: 'Gifts By U', icon: 'eva-gift-outline' },
  { name: 'Tests', label: 'Tests', icon: 'eva-clipboard-outline' },
];
const events = [
  { type: 'heading', text: 'When We Met (May-23rd)' } satisfies TimelineHeading,

  {
    type: 'entry',
    title: 'Our First Milestone (Corriander Restaurant)',
    subtitle: '(May 23, 2025)',
    image:
      'https://lh3.googleusercontent.com/p/AF1QipOEKw_96559xWzYHQTIdHh0t9832ZHt3G5aJAJQ=s680-w680-h510-rw',
    description: [
      'You came to my place that beautiful evening after so long.',
      'We went to Corriander Restaurant, and you sat beside me without any gap or hesitation.',
      'We went to the mall together, and you playfully slapped me when I looked at another girl.',
      'You took me to Biryani by Kilo just because I had a non-veg craving.',
      'Later in the evening, I dropped you home, still smiling from everything we shared that day.',
    ],
    side: 'left',
    icon: 'rocket_launch',
    entryColor: 'orange',
  } satisfies TimelineEntry,

  {
    type: 'entry',
    title: 'Our First Devotional Trip',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/3/32/Dakhineshwar_Temple_beside_the_Hoogly%2C_West_Bengal.JPG',
    subtitle: '(May 24 2025)',
    description: [
      'I visited your campus, and from there we took the metro.',
      'I offered you a chocolate, and you smiled—“first time you gave me a chocolate.”',
      'We visited the temple and went straight for special darshan at the main sanctum.',
      'Walking hand-in-hand into the temple felt like the most beautiful thing.',
      'Afterwards we headed to a faraway mall, crossing the Howrah Bridge.',
      'You slept on my shoulder for a long while, holding my hand the whole way.',
    ],

    side: 'right', // optional
    icon: 'temple_hindu', // optional (or any Material icon you use)
    entryColor: 'red', // optional
  } satisfies TimelineEntry,

  {
    type: 'entry',
    title: 'My final test to my Love (was painfull but need to do it)',
    image:
      'https://content.jdmagicbox.com/v2/comp/kolkata/l2/033pxx33.xx33.250228190421.j6l2/catalogue/cafe-37-milk-belgachia-kolkata-coffee-shops-71hfhntuuo.jpg',
    side: 'left', // optional
    icon: 'temple_hindu', // optional (or any Material icon you use)
    entryColor: 'pink',
    description: [
      'That day felt like a test—painful, but necessary—and it only made me surer about us.',
      'I don’t know how you felt, but I felt wonderful. I’d been waiting for you to ask me out; even a small plan from you means the world to me.',
      'It’s not the place I love; it’s any place with you. When you’re with me, I can sit for hours—calm and peaceful.',
      'I never imagined my peace lived in you. I’m sorry I didn’t come earlier—but I’m not leaving you.',
    ],
  } satisfies TimelineEntry,
] satisfies TimelineItem[];

const slides: CarouselSlide[] = [
  {
    image: picAngry,
    name: 'I am Sorry',
    caption:
      'Hey baby, I’m sorry for raising my voice. I only wanted you to feel open with me, not closed off. It’s always been a quiet kind of love, but it’s real.',
  },
  {
    image: picLove,
    name: 'I Love u',
    caption:
      'I’ve loved you since our childhood. I showed it in a playful, naughty way—never to hurt you. If I’d known you loved me too, I’d have dropped the teasing and never let you go.',
  },
  {
    image: picSad,
    name: "I Don't like u to be sad i will light up ur mood every time",
    caption:
      "I never dated because I didn’t feel anything for anyone. Proposals came with age, but I never took them seriously. I was afraid of emotional weakness—yet I want to fall for you, even if it’s late. If I don’t show it now, what's the point in loving",
  },
  {
    image: picHappy,
    name: 'I want u be Happy My baby',
    caption:
      'I want you happy—and I want to be there to keep that smile. I’m a little afraid of losing you, so I keep asking you to marry me, just so my heart knows you’re staying with me.',
  },
  {
    image: picLove2,
    name: 'why am i loving u so intense',
    caption:
      'I’ve loved you since childhood. I used to kiss you so many times back then—and even when I got caught, I still couldn’t stop. Even now, I find myself kissing you again and again. I’ve controlled myself so much whenever I saw you, thinking you never felt anything for me. But this love has always been there, and it always will be—it comes out only with you.',
  },
  {
    image: picEmotional,
    name: 'U have Overloaded me with emotions',
    caption:
      'I had no emotions, no feelings—I was always strong. But you made me weak. Why did you have to? I was fine, I was strong when I never expressed my love. But the moment I did, you made me vulnerable, completely surrounded and surrendered to your emotions. Yet somehow, I feel like you’re actually making me stronger—in every way, in new ways I never imagined. I feel strangely strong in love, able to control my negative emotions, my anger, my irritations. You make me calm, peaceful—no shouts, no storms. Without even trying, you’ve changed me so much, and I love the person I am becoming with you. You even made me stop a 14-year habit—I guess I just needed to be loved by you. That must be my destiny',
  },
  {
    image: picKiss,
    name: 'Umma 😘😘😘, i love the way u kiss me.(Smart)',
    caption:
      'I love the way you kiss me, the way you pull me close, the way you stay near and even feed me—you are perfect, my love. You are exactly how I had always imagined. For so long, I thought you never loved me, that you had nothing for me… but when I realized the truth, I found myself crying every day. All I want now is to live my life with you—if you agree, I will be the happiest. And if not, then at least let me live a part of my life with you. We can be such a beautiful couple—I will protect you from every evil eye and work for all your needs, my love. Please… live with me.',
  },
  {
    image: picChild,
    name: 'finally when did i fall ❤️ for u..?',
    caption:
      'Finally, I wonder—when did I truly fall? Maybe it was back in third standard, the very first time I kissed you when we were alone in that little room above the stairs. That was the moment I started loving you, and that love has never left me.',
  },
  {
    image: picchildhittu,
    name: 'Will This Child Always Stay Cute for You?',
    caption:
      'Why would a child ever be angry with his mother? I’ve missed you since my childhood, and now you’re slowly, steadily becoming my everything. I love how you take control over me—so effortlessly, without me even realizing it. This kid has always craved your kisses, your hugs, your love, and your pampering. Yes, he’s made mistakes, but he loves you deeply and is changing for you. So please… don’t push him away, don’t fight with him. Even if he slips up sometimes, all he really wants is to stay close to you—and to remain that same cute child in your eyes, always.',
  },
  {
    image: spltogether,
    name: 'Together Forever',
    caption:
      'In this journey of love, I want us to be together forever. Through every challenge, every joy, and every moment, let’s hold on to each other tightly. You are my everything, and I can’t imagine my life without you by my side.',
  },
  {
    image: splflaunt,
    name: 'My Hot Cheri 😘',
    caption:
      'I love flaunting our love to the world. Every moment spent with you is a treasure, and I want everyone to see how beautiful our bond is. Let’s create memories that we can proudly share, showcasing the depth of our connection.',
  },
];

function onAction({
  action,
  item,
  index,
}: {
  action: TimelineAction;
  item: TimelineItem;
  index: number;
}) {
  console.log('Action clicked:', action, 'on item', index, item);
}

const verticleTab = ref('mails');

const verticleTabs = [
  {
    name: 'mails',
    icon: 'mail',
    label: 'You Feel Confused About Us..?',
    title: 'Inbox',
    html: `We didn’t express things before. We didn’t talk then.
And somehow, after all this time, we found our way back—unexpectedly, quietly, but fully.

Now we’re here. Sharing late-night talks, teasing each other, laughing, crying, remembering,
and feeling everything like no time ever passed.

It is confusing sometimes, I know. For you, for me, for whatever “this” is.

But maybe not everything needs to be figured out right now.
Maybe this doesn’t need a name or a definition.
Maybe this is just two people who missed each other far too long
and are now building something gentle. Something real.

Even if it doesn’t come with answers, and for now, that’s enough for me.
These moments, these memories we’re making—they matter.
And somewhere deep down, we both know this, whatever it is… special.`,
    reply: true,
    replyLabel: 'Show Reply',
    replyData: `**I’ve been missing you so much these past days 💔.**
I’ve made mistakes—serious ones—that hurt me deeply, almost like being shot in the knee and nearly in the heart… but I’m still here.
I’m stronger every time I fall, and I’ll always come back to you.

**I need your love, your support, your everything ❤️.**
I know I wasn’t there when you needed me the most, and I thought you never truly felt anything for me 😔.
Please forgive me… I was wrong.

**I’m not confused—I just know I don’t want to miss you.**
You make me feel safe, cherished, and truly loved. I never mean to force you; I know you may not say yes…
but I wanted to give my last try, with 100% of my heart.

**I love you endlessly,** and I promise to keep fighting my way back to you, always 💕✨.`,
  },

  {
    name: 'alarms',
    icon: 'alarm',
    label: 'You Remember Our Cooking and Dancing Days',
    title: 'When We Cook',
    html: `Let’s be honest—We made the best team in the kitchen ^_^

You were cooking paneer like a pro, I cooked chicken, and somehow everything turned out perfect. No chaos. Just music playing, us dancing like kids in between, laughing at nothing, enjoying everything.

I’d keep coming in to help you, act bossy sometimes, and you’d still let me do things my way. Then we’d curl up to watch a movie, eat the food we made together, and it felt so peaceful.

You even made coffee for me every morning, took care of me in those small, quiet ways that meant more than anything.
That day wasn’t just good. It was golden.`,
    reply: true,
    replyData: `You know… that was one of my **lifetime goals ✨**—to have a day like that with you.

Cooking side by side 👩‍🍳👨‍🍳, laughing 😂, dancing 💃🕺, eating what we made together 🍴,
and then just curling up peacefully 🎬💤… it felt like a dream I always wanted to live.

And with you, it became real ❤️.
That day wasn’t just golden—it was **everything** 🌹💫.`,
  },

  {
    name: 'movies',
    icon: 'movie',
    label: "You Miss Me 😘 But Won't",
    title: 'Do u Miss Me? 😘',
    html: `You may not say it, but your little "hiii", that random "Ummm" — I hear it all.
You miss me, don’t you? ^_^
It’s okay. I miss you too. Quietly, stubbornly again, even if we start with a fight.
We’re weird like that. But it’s our kind of weird.`,
    reply: true,
    replyData: `Maybe I don’t always say it, but **yes… I miss you too** 💗.

Your little ‘hiii’, your ‘ummm’, even that cute ‘abbaba’ and the way you go ‘umm umm umm’—I hear it all 🎧.
They stay with me.

Even if we fight, even if we’re stubborn, we always find our way back 🔁.
We’re crazy, we’re weird… but it’s **our** kind of love, and I wouldn’t trade it for anything 💞.`,
  },

  {
    name: 'gym',
    icon: 'dumbbell',
    label: "You're at the Gym feeling Tired but Focused",
    title: 'Gym Mode',
    html: `Some people work out for fitness.
You? You’re on a mission. Abs coming soon.
I can already imagine the day you’ll stand in front of the mirror and say, "See? I told you."

But for me, it’s not about the abs or the gym selfies.
It’s about how far you’ve come. About your fire, your discipline,
and the way you show up even when no one’s clapping.
That? That’s why I’m proud of you.`,
    reply: true,
    replyData: `Hearing this from you means more than any mirror or abs ever will ❤️.

You see the **effort** behind it, not just the results—and that means everything to me.
Knowing you’re proud of me is the real fuel that keeps me going 🔥.

With you beside me, I don’t just feel stronger in the gym—I feel stronger in life too 💪✨.`,
  },

  {
    name: 'stress',
    icon: 'moon',
    label: "You Feel Stressed and Can't Sleep",
    title: 'Night Thoughts',
    html: `I know your brain’s probably running a marathon again tonight.
So take a breath… a slow one. Imagine us, black coffee, soft talks, no fights, just peace.

Even your "I surrender" moment plays in my head right now ^_^

You don’t have to fix everything tonight. Just rest. Even if sleep’s not coming,
close your eyes and know: someone’s silently thinking of you, like always.`,
    reply: true,
    replyData: `Close your eyes, I’m right here 🌙

Slow breath in… slow breath out 😌.
No fixing tonight—just rest. I’m holding the quiet for us 🤍.`,
  },

  {
    name: 'cute',
    icon: 'heart',
    label: 'You Realize you are Getting Cute these Days',
    title: 'Cute Moments',
    html: `You… yes, you.
The one who used to annoy me like crazy, tease me till I’d roll my eyes, poke me, laugh when I got mad.

Now? You’re being soft. Patient. Sitting quietly when I’m moody.
Letting me hit you (hard) when you show up late, and still somehow smiling through it all.

You’re turning into this soft, sweetest version of yourself.
Too cute. Too dangerous. I don’t like it.
[Okay, maybe I do]`,
    reply: true,
    replyData: `Ohhh so now you **admit** you like this version of me 😏.

Don’t worry, the annoying, teasing me is still alive—I’m just giving you the **“soft upgrade”** package for free 😂❤️.

Careful though… if I get too cute, you might never escape me 😜.
And honestly, imagine how **you** have already killed me with your cuteness 💘.`,
  },

  {
    name: 'trip',
    icon: 'map',
    label: 'You Dream about our Trip',
    title: 'Travel Dreams',
    html: `You always talk about taking me on a long drive,
and I hope we may go somewhere peaceful like Kerala or Meghalaya.
Just us, quiet roads, calm skies, black coffee in hand, and music playing low.

We’d stop at cute spots, share silly stories, maybe sit by a lake and just be—
no rush, no noise, just soft time together.

Honestly? That sounds like the kind of memory I’d never want to forget.`,
    reply: true,
    replyData: `**Let’s make that trip happen** 🚗✨

Quiet roads, low music, coffee in hand ☕️, and just us—no rush, no noise.
Kerala or Meghalaya… I’m already packing our memories 🧳💚.`,
  },

  {
    name: 'weird',
    icon: 'smile',
    label: 'You Miss Our Weird Conversations',
    title: 'Weird Talks',
    html: `"Hiiii Hitheshhhhhh..." ^_^
That’s how it always starts, no matter what. Then it turns into “how’s the day,” some silly leg-pulling, and now, I’m the one teasing you nonstop, and you’re just sitting there quietly like this innocent little monk.

And then, your dramatic moment comes, you raise your invisible white flag, smile, and say, “I surrender… no fight, only love.”
That one line? Kills me every single time ^_^

We talk about everything and nothing at once. It makes no sense but somehow feels like home. It’s weird, it’s funny, it’s soft, it’s just us.`,
    reply: true,
    replyData: `It’s weird, but **it’s ours** ❤️

From “Hiiii Hitheshhhhhh…” to “I surrender—no fight, only love” 🤍,
you make the nonsense feel like home.`,
  },

  {
    name: 'return',
    icon: 'refresh',
    label: 'You Wonder if Coming Back Was Worth it..',
    title: 'Return',
    html: `It was. Even with the late timing,
even with all the years we lost in silence, it was still worth it.
Because you came back.

After everything. After pain, after heartbreak,
after the kind of loneliness you never spoke about.
You remembered me. You searched for me.
And you let your heart finally say what it held in for so long.

You didn’t owe me an explanation.
But you showed up anyway, quietly, honestly,
with all that love still tucked inside you.
And that moment? It healed something in both of us.

Now we have these little stolen moments—
the talks, the laughs, the teasing, the shared peace—
and even if they’re brief, they’re ours.

Thank you… for not giving up.
For not staying silent.
For still choosing to come back,
even when you didn’t know what you’d find.`,
    reply: true,
    replyData: `Reading this feels like you just touched the deepest part of me 💖.

Yes, we lost years in silence. Yes, there was pain and heartbreak… but somehow, **destiny** pulled us back together.
I never forgot you, not for a moment.

When I finally found the courage to come back, it was because my heart always knew where it belonged—**with you**.
And the truth is, I never knew you carried the same love for me all along. That realization still overwhelms me 🥹.

These little moments we share now—the laughs, the peace, even the teasing—mean the world to me 🌍.
Thank you for letting me back in, for holding space for me, and for reminding me that **love never really dies**—it just waits to be found again ❤️✨.`,
  },

  {
    name: 'feelings',
    icon: 'sparkles',
    label: 'You Feel Too Much All at Once',
    title: 'Overwhelmed',
    html: `Sometimes, your feelings come out in waves—slow, deep, and real.
And I’ve been watching you carry so much quietly… the pain, the memories, the heaviness from everything you’ve been through.

You’ve gone through a lot, more than you even know.
And still, you show up—soft, honest, trying to heal one moment at a time.

You once told me you couldn’t sleep properly, that your mind was always noisy, restless.
And now, somehow, with me, you feel calm, happy, and peaceful.
Like things inside you are slowly settling.

I don’t even know how or when that happened, but hearing that from you?
That meant more than you’ll ever realize.

You don’t have to hold it all together with me.
You’re allowed to be soft, open, and completely you.
And if being around me gives you even a tiny bit of peace,
then I’ll keep holding space for that version of you, always.`,
    reply: true,
    replyData: `I felt so low when I wanted to come to you… like I lost the confidence to face you and say what I truly felt 🫣.
I carried this feeling but couldn’t bring myself to tell you that I **love you**.

Nothing usually breaks me… but I’ve realized these days that being away from you, not talking, or letting fights drag on makes me weak 💔.
I wanted you to feel good—I know we’ve had conflicts with our families, and I never wanted that to weigh on us.
In reality, I just couldn’t speak through my anger… **because you didn’t come home in TPT** 😔.

But now, I’m glad you’re in **Kolkata**—I love Kolkata because of you 🏙️💘.
Being able to stay with you, share with you… my heart feels light ❤️.`,
  },
  {
    name: "B'day bash",
    icon: 'cake',
    label: 'You Celebrate Each Other',
    title: 'Birthday Bash',
    html: `from annoying me endlessly to quietly bearing all my moods, you’ve changed and it’s the softest surprise.
Thank you for finally showing up, for staying, for making even the smallest moments feel special; you’re being too cute these days and somehow, I’m cherishing every bit of this version of you… ♥, Happieee birthdayyy ♥♥`,
    reply: true,
    replyData: `Celebrating with you this time has been the highlight of my year 🎉.

I love how you made it feel so special just by being you, but because every gesture of yours feels big and every moment is heart-touched. From the thoughtful gifts to the sweet messages, you knew exactly how to make me feel loved and appreciated.

And it wasn’t just about the day itself—it was about the way we created memories together that I’ll always cherish. Whether it was a quiet dinner or a fun moment, being with you made everything feel like a celebration.

Still, I regret that I couldn’t celebrate *your* special day the way I wanted to. But know this—my love isn’t tied to one day. It’s steady, every single day. I might miss marking the date, but I’ll never miss an opportunity to be with you, to meet you, and to make you feel loved 💖.

Thank you for giving me such a beautiful memory this year—I can’t wait for all the moments we’ll create together ✨.`,
  },
];
</script>
