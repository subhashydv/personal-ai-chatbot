import pdf from 'pdf-parse';

export async function readFile(file) {
  let text = ''
  if (file.mimetype === 'application/pdf') {
    const data = await pdf(file.buffer);
    text = data.text;
  } else if (file.mimetype === 'text/plain') {
    text = file.buffer.toString('utf8');
  }

  return text;
};
