export default {
  data: function () {
    return {
      கவனிப்பவர்கள்: []
    }
  },
  methods: {
    கவனி: function(இலக்கு, நிகழ்வு, செயலி) {
      if (typeof நிகழ்வு !== 'string') {
        நிகழ்வு.map(நி=>this.கவனி(இலக்கு, நி, செயலி))
        return
      }
      this.கவனிப்பவர்கள்.push({ நிகழ்வு, இலக்கு, செயலி })
      இலக்கு.on(நிகழ்வு, செயலி)
    }
  },
  destroyed: function() {
    for (let { இலக்கு, நிகழ்வு, செயலி } of this.கவனிப்பவர்கள்) {
      இலக்கு.off(நிகழ்வு, செயலி)
    }
  }
}
