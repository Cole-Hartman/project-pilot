let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/CODE/project-pilot
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +51 ~/CODE/project-pilot/src/components/CustomAuth.jsx
badd +2 ~/CODE/project-pilot/src/routes/GetStarted.jsx
badd +1 ~/CODE/project-pilot/src/components/AuthWrapper.jsx
badd +28 ~/CODE/project-pilot/src/routes/Profile.jsx
badd +24 src/main.jsx
badd +23 src/App.jsx
badd +1 src/components/Navigation.jsx
badd +9 ~/CODE/project-pilot/src/components/navbar.jsx
badd +4407 ~/CODE/project-pilot/node_modules/@types/react/index.d.ts
badd +39 ~/CODE/project-pilot/src/components/navbarButtons.jsx
argglobal
%argdel
edit ~/CODE/project-pilot/src/components/navbarButtons.jsx
argglobal
balt ~/CODE/project-pilot/src/components/navbar.jsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 32 - ((24 * winheight(0) + 17) / 35)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 32
normal! 012|
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
nohlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
