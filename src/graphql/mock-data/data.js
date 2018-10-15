import casual from 'casual-browserify'

export default {
  emails: [...Array(17).keys()].map(i => ({
    id: casual.uuid,
    subject: casual.sentence,
    body: casual.text,
    isRead: i < 3 ? false : casual.boolean,
  })),
}
