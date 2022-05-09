Sound Squeezr uses the FFmpeg WASM port, to take an inputted media file and compress the dynamic range of the audio for better listening on lower quality speakers or for specific listening environments. All adjustments to the inputted file are done client-side, rather than passing large media files through to a server, resulting in reduced server load and faster retrieval time for the outputted file. The client-side aspect also ensures the security and integrity of your file as all modifications to the file are done right in the browser, and no information is transmitted across the internet. The end result is the original file, and a duplicate media file with "out\_" prepended to indicate the modified file.

