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
    //   "editorial"  magazine layout, day name running down the side
    //   "hold"       photo cut into the shape of a climbing hold
    //   "topo"       a page from a climbing guidebook, with a route drawn on
    //
    // Each day also gets a hold colour, like gym circuits (Mon red, Tue orange, Wed yellow,
    // Thu green, Fri blue, Sat purple). To change one, add  color: "pink"  to that day.
    // Options: red, orange, yellow, green, blue, purple, pink, teal
    days: [
      { file: "mon",  day: "Monday",    style: "tag",       caption: "Picking up my Princess from the airport SYNG BGNT" },
      { file: "tue",  day: "Tuesday",   style: "panel",     caption: "SNOOPY COUPLE woi nnti klo we climb kebetulan same day pake lgi hehehe" },
      { file: ["wed", "wed2"], day: "Wednesday", style: "arch",      caption: "GIRLFRIEND DAYYYY i hope u never regret saying yes I LOVE YOU SO MUCH" },
      { file: "thur", day: "Thursday",  style: "editorial", caption: "A short caption for Thursday" },
      { file: "fri",  day: "Friday",    style: "hold",      caption: "A short caption for Friday" },
      { file: "sat",  day: "Saturday",  style: "topo",      caption: "A short caption for Saturday" }
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
      "Write how it started here. The first time you noticed her, the first session together, whatever comes to mind first.",
      "Something you've learned from her, or something she does that makes everything feel easier.",
      "A harder moment you got through together, or the part of this that matters most to you.",
      "Where you are now, and what you're looking forward to. Keep it simple and honest."
    ],

    signoff: "Always,",     // shown above your name at the end of the letter

    // Optional P.S. at the very bottom. Set to "" to hide it.
    ps: "P.S. A small thing you want her to read last."
  },

  // Photo file type. If a .png isn't found, the site also tries .jpg, .jpeg and .webp.
  imageExtension: "png"
};
