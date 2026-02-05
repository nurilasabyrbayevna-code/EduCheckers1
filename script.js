// Навигация
const sections = {
    home: document.getElementById('home'),
    game: document.getElementById('game'),
    rules: document.getElementById('rules'),
    teacher: document.getElementById('teacher')
};

function toggleSections(show){
    for(let k in sections) sections[k].classList.add('hidden');
    sections[show].classList.remove('hidden');
}
function showHome(){ toggleSections('home'); resetGame(); }
function showRules(){ toggleSections('rules'); }
function startGame(){ toggleSections('game'); initBoard(); }
function showTeacher(){ toggleSections('teacher'); }

// Дыбыстар
const correctSound = new Audio('sounds/correct.mp3');
const wrongSound = new Audio('sounds/wrong.mp3');
const moveSound = new Audio('sounds/move.mp3');
const captureSound = new Audio('sounds/capture.mp3');

// Ойын логикасы
let boardState=[], selectedPiece=null;

// 🔹 40 сұрақ (W1-W20, B1-B20)
const questions = [
  {piece:'W1', question:'«Мен барамын, … сен үйде қаласың» – дұрыс шылау?', options:['бірақ','және','немесе'], answer:'бірақ'},
  {piece:'W2', question:'«Ол кітап оқиды, … сабаққа дайындалады» – дұрыс шылау?', options:['және','немесе','бірақ'], answer:'және'},
  {piece:'W3', question:'«Сен оқыдың ба, … мен де оқыдым» – дұрыс шылау?', options:['де','па','ме'], answer:'де'},
  {piece:'W4', question:'«Ол жүгірді, … мен кідірмедім» – дұрыс шылау?', options:['және','бірақ','немесе'], answer:'және'},
  {piece:'W5', question:'«Мен тамақ іштім, … сен әлі ашсың» – дұрыс шылау?', options:['бірақ','немесе','және'], answer:'бірақ'},
  {piece:'W6', question:'«Ол ән айтты, … би де биледі» – дұрыс шылау?', options:['және','бірақ','немесе'], answer:'және'},
  {piece:'W7', question:'«Сен барасың ба, … мен қаламын» – дұрыс шылау?', options:['бірақ','және','немесе'], answer:'бірақ'},
  {piece:'W8', question:'«Мен дайындалдым, … сен де дайындалдың ба?» – дұрыс шылау?', options:['және','немесе','бірақ'], answer:'және'},
  {piece:'W9', question:'«Ол оқиды, … ойынға барады» – дұрыс шылау?', options:['бірақ','немесе','және'], answer:'немесе'},
  {piece:'W10', question:'«Мен кітап оқимын, … сен де оқисың» – дұрыс шылау?', options:['де','па','бірақ'], answer:'де'},
  {piece:'B1', question:'«Мен барамын, … сен қаласың ба?» – дұрыс шылау?', options:['бірақ','және','немесе'], answer:'бірақ'},
  {piece:'B2', question:'«Ол кітап оқиды, … сабаққа дайындалады» – дұрыс шылау?', options:['және','немесе','бірақ'], answer:'және'},
  {piece:'B3', question:'«Сен дайынсың ба, … мен де дайын
