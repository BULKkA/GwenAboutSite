const defaultComments = [
  {
    name: 'LuxEnjoyer',
    message: 'Очень нежный вайб: будто личный блог и мастерская в одном месте.',
  },
  {
    name: 'Needle Mage',
    message: 'Карточки проектов классно сочетаются с Gwen-эстетикой!',
  },
];

const commentForm = document.querySelector('#comment-form');
const commentList = document.querySelector('#comment-list');
const playToggle = document.querySelector('.play-toggle');
const progressBar = document.querySelector('.progress span');
const trackTitle = document.querySelector('.track-title');

const playlist = [
  'Needlework Dreams',
  'Pastel Scissors',
  'Hallowed Lo-fi',
];
let trackIndex = 0;
let isPlaying = false;

function getComments() {
  const savedComments = localStorage.getItem('gwen-comments');
  return savedComments ? JSON.parse(savedComments) : defaultComments;
}

function saveComments(comments) {
  localStorage.setItem('gwen-comments', JSON.stringify(comments));
}

function renderComments() {
  if (!commentList) return;

  commentList.innerHTML = '';
  getComments().forEach((comment) => {
    const item = document.createElement('article');
    const author = document.createElement('strong');
    const message = document.createElement('p');

    item.className = 'comment-item';
    author.textContent = comment.name;
    message.textContent = comment.message;
    item.append(author, message);
    commentList.append(item);
  });
}

commentForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(commentForm);
  const nextComment = {
    name: formData.get('name').toString().trim(),
    message: formData.get('message').toString().trim(),
  };

  if (!nextComment.name || !nextComment.message) return;

  const comments = [nextComment, ...getComments()];
  saveComments(comments);
  renderComments();
  commentForm.reset();
});

playToggle?.addEventListener('click', () => {
  isPlaying = !isPlaying;
  playToggle.textContent = isPlaying ? 'Ⅱ' : '▶';
  progressBar.style.width = isPlaying ? '78%' : '42%';

  if (isPlaying) {
    trackIndex = (trackIndex + 1) % playlist.length;
    trackTitle.textContent = playlist[trackIndex];
  }
});

renderComments();
