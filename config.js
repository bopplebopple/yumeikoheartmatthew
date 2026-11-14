/* ==========================================================================
   ALL THE TEXT ON THE SITE LIVES HERE.
   Edit anything between the quotes and refresh the page.

   Page order:  1. opening screen  →  2. photos, one per screen  →  3. the letter

   Tips
   - {to} and {from} get replaced with the names below, anywhere you use them.
   - Press Enter inside backticks (`like this`) to make a line break,
     or use "\n" inside normal quotes.
   - To add or remove a letter paragraph, add or delete one "..." line in letter.paragraphs.
   ========================================================================== */

window.CONFIG = {
  // Names used across the page
  to: "Yumeiko",
  from: "Matthew",

  // The browser tab title
  pageTitle: "for {to}",

  /* ---------- 1. Opening screen ---------- */
  hero: {
    kicker: "to my GIRLFRIENDDD <3",            // small line above the name
    title: "{to}",                          // the big text
    subtitle: "Something small for you to look at during ur flight hehehe",
    scrollHint: "scroll"                    // small cue at the bottom
  },

  /* ---------- 2. Photos, one per screen ---------- */
  week: {
    heading: "this week's 'sends'",
    subheading: "a few favorite moments, Monday to Saturday",

    // "file" must match the photo name inside the /images folder
    // (images/mon.png, images/tue.png ... images/sat.png).
    //
    // "style" is how that photo is shown. Swap them around freely:
    //   "tag"        taped card, like the route tags at the gym
    //   "panel"      thick coloured frame with a bolt in each corner, like a wall panel
    //   "arch"       framed in an arched window, centered
    //                (give it two files, file: ["wed", "wed2"], for two arches side by side)
    //   (the "topo" style can also take two files, e.g. file: ["sat", "sat2"])
    //   "editorial"  magazine layout, day name running down the side
    //   "hold"       photo cut into the shape of a climbing hold
    //   "topo"       a page from a climbing guidebook
    //
    // Each day also gets a hold colour, like gym circuits (Mon red, Tue orange, Wed yellow,
    // Thu green, Fri blue, Sat purple). To change one, add  color: "pink"  to that day.
    // Options: red, orange, yellow, green, blue, purple, pink, teal
    days: [
      { file: "mon",  day: "Monday",    date: "09 Nov 2026",    style: "tag",       caption: "Picking up my Princess from the airport SYNG BGNT" },
      { file: "tue",  day: "Tuesday",   date: "10 Nov 2026",   style: "panel",     caption: "SNOOPY COUPLE woi nnti klo we climb kebetulan same day pake lgi hehehe" },
      { file: ["wed", "wed2"], day: "Wednesday", date: "11 Nov 2026", style: "arch",      caption: "GIRLFRIEND DAYYYY i hope u never regret saying yes I LOVE YOU SO MUCH" },
      { file: "thur", day: "Thursday",  date: "12 Nov 2026",  style: "editorial", caption: "our first n def not our last photobooth <3" },
      { file: "fri",  day: "Friday",    date: "13 Nov 2026",    style: "hold",      caption: "HDL WITH MY BEBEEEEEEEEEEE" },
      { file: ["sat", "sat2"], day: "Saturday",  date: "14 Nov 2026",  style: "topo",      caption: "THE BEST DATE OF MY LIFEEEE" }
    ],

    // Extra text used only by the "topo" (guidebook) style
    topo: {
      stars: "★★★",                         // guidebook quality rating
      credit: "first ascent: {to} & {from}"
    },

    // Shown in place of a photo that hasn't been added yet
    missingPhotoText: "photo coming soon"
  },

  /* ---------- 3. The letter (on paper, at the very bottom) ---------- */
  letter: {
    // Small line shown just above the paper
    intro: "and one more thing",

    // The little "route tag" at the top of the letter, like the tags on gym boulders.
    // Change, add or remove rows. Use  routeCard: []  to hide it.
    routeCard: [
      { label: "problem", value: "a letter for {to}" },
      { label: "grade",   value: "V∞" },
      { label: "setter",  value: "{from}" },
      { label: "date",    value: "November 2026" }
    ],

    greeting: "Dear {to},",

    // Each line in quotes is one paragraph. Add or remove as many as you like
    // (keep a comma between them).
    paragraphs: [
      "Bebe I love you so much thank you for also choosing me, I hope u had as much fun as i did this week. Bebe safe flight ya im sorry i didnt get u any flowers all the peonies lama bgnt po ny and i really wanted the first flower u receive from me to be ur favorite flower :( I know im not perfect but i will try to be for u, u deserve the perfect boyfriend i hope i could be that for you. I dont wanna lose u bebe pls stay semangat in climbing and know i will always love you and will always try my best for you."
    ],

    signoff: "Love,",     // shown above your name at the end of the letter

    // Optional P.S. at the very bottom. Set to "" to hide it.
    ps: "P.S. SAFE FLIGHT MY GIRLFRIENDDDD."
  },

  // Photo file type. If a .png isn't found, the site also tries .jpg, .jpeg and .webp.
  imageExtension: "png"
};
