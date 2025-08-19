<template>
  <typeWritter title="Spoorthy" />
  <GlassTabs v-model="tab" :tabs="tabs">
    <template #timeline>
      <timeline :events="events" color="secondary" @action="onAction" />
    </template>
    <template #memories>
      <div class="row">
        <div class="col">
          <carousel :slides="slides" fit="contain" side-width="clamp(140px, 22vw, 320px)" />
        </div>
      </div>
    </template>
  </GlassTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import typeWritter from '../components/typeWritter.vue';
import GlassTabs from '../components/tabs.vue';
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

const tab = ref('timeline');
const tabs = [
  { name: 'timeline', label: 'Timeline', icon: 'eva-eye-outline' },
  { name: 'memories', label: 'Memories', icon: 'eva-tv-outline' },
  { name: 'interesting', label: 'Interesting', icon: 'movie' },
  { name: 'Questions', label: 'Questions', icon: 'eva-mic-outline' },
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
</script>
