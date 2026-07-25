0) LOCK SCREEN RIDDLE (shown on the "Shinchan" question)
   public/photos/shinchan-dance.gif

   Shown as a small card above that one question. Any image or gif
   works — just make sure the filename matches what's set on that
   riddle's `image` field in components/LockScreen.tsx.

0.5) FIRST WHATSAPP CHAT (shown right after the welcome screen)
   public/photos/first-chat.jpg

   Edit the image path, date, and caption in data/firstChat.ts.

There are three kinds of photo slots in this site:

1) THE GALLERY (clear photos, shown at once)
   public/photos/memory-1.jpg
   public/photos/memory-2.jpg
   public/photos/memory-3.jpg

   Edit the `photos` array at the top of components/PhotoGallery.tsx
   to point at your filenames and add captions:

     const photos: Photo[] = [
       { src: "/photos/memory-1.jpg", caption: "Beach day", rotate: -5 },
       { src: "/photos/memory-2.jpg", caption: "Your birthday", rotate: 4 },
     ];

2) SMALL POLAROID PHOTOS (one per page)

   public/photos/welcome.jpg    -> shown on the welcome screen
   public/photos/card-1.jpg     -> "I'm Sorry."
   public/photos/card-2.jpg     -> "I know I hurt you..."
   public/photos/card-3.jpg     -> "I don't expect one website..."
   public/photos/card-4.jpg     -> "Harshu... Sonu... Shona..."
   public/photos/card-5.jpg     -> "If I could rewind time..."
   public/photos/card-6.jpg     -> "Thank you..."
   public/photos/card-7.jpg     -> "I don't want one mistake..."
   public/photos/card-8.jpg     -> "I promise..."
   public/photos/card-8b.jpg    -> "I won't leave your hand, or you..."
   public/photos/card-9.jpg     -> "Please forgive me."
   public/photos/letter.jpg     -> shown on the handwritten letter
   public/photos/final.jpg      -> shown on the "will you forgive me" page
   public/photos/waiting.gif    -> shown on the "I Need Time" screen

3) CLOSING SLIDESHOW (after she submits her answer)
   public/photos/closing-1.jpg
   public/photos/closing-2.jpg
   public/photos/closing-3.jpg
   public/photos/closing-4.jpg
   public/photos/closing-5.jpg

   These loop slowly with captions on the very last screen. Edit the
   list (and captions) in data/closingPhotos.ts — you can add more or
   fewer than 5.
