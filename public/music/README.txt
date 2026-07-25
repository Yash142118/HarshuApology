Two tracks are supported:

  public/music/intro-song.mp3   -> plays from the very start, during the
                                    lock/riddle screens
  public/music/our-song.mp3     -> takes over the moment "Hi Harshu"
                                    appears on the welcome screen, and
                                    stays playing for the rest of the site

If you only have one song, just use the same filename for both, or edit
INTRO_TRACK / MAIN_TRACK near the top of components/Experience.tsx to
point both at the same file.

If you want a different filename, update INTRO_TRACK / MAIN_TRACK in
components/Experience.tsx to match.

Keep both files reasonably small (under ~8MB each) so they load quickly
on mobile data.

Two more, short one-shot clips play once each on the riddle screens
(these layer on top of whichever background track is playing, so keep
them brief):

  public/music/shinchan-song.mp3   -> plays once on the Shinchan riddle
  public/music/peppa-song.mp3      -> plays once on the Peppa Pig riddle