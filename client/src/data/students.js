const students = [
    {
      id: 1,
      name: 'Abee',
      gender: 'L',
      photo: '/public/avatar-default.png',
      quote: 'Belajar koding hari ini, panen hasilnya besok.'
    },
    {
      id: 2,
      name: 'Alya Putri',
      gender: 'P',
      photo: '/public/avatar-default.png',
      quote: 'Debugging adalah seni mencari jarum di tumpukan kode.'
    },
    {
      id: 3,
      name: 'Bagas Pratama',
      gender: 'L',
      photo: '/public/avatar-default.png',
      quote: 'Setiap error adalah teman belajar baru.'
    },
    {
      id: 4,
      name: 'Citra Ayu',
      gender: 'P',
      photo: '/public/avatar-default.png',
      quote: 'UI yang bagus datang dari perhatian terhadap detail.'
    },
    {
      id: 5,
      name: 'Dafa Nugraha',
      gender: 'L',
      photo: '/public/avatar-default.png',
      quote: 'RPL: Rancang, Proses, Launch.'
    },
    {
      id: 6,
      name: 'Eka Saputra',
      gender: 'L',
      photo: '/public/avatar-default.png',
      quote: 'Clean code, clear mind.'
    },
    {
      id: 7,
      name: 'Farah Aulia',
      gender: 'P',
      photo: '/public/avatar-default.png',
      quote: 'Belajar sedikit setiap hari lebih baik dari banyak tapi jarang.'
    },
    {
      id: 8,
      name: 'Gilang Fahrezi',
      gender: 'L',
      photo: '/public/avatar-default.png',
      quote: 'Refactor hari ini, bahagia besok.'
    },
    {
      id: 9,
      name: 'Hana Nuraini',
      gender: 'P',
      photo: '/public/avatar-default.png',
      quote: 'Desain yang baik terasa sebelum terlihat.'
    },
    {
      id: 10,
      name: 'Ivan Fathur',
      gender: 'L',
      photo: '/public/avatar-default.png',
      quote: 'Satu bug tertangkap, sepuluh ilmu didapat.'
    },
    {
      id: 11,
      name: 'Jihan Putri',
      gender: 'P',
      photo: '/public/avatar-default.png',
      quote: 'Setiap project adalah cerita baru.'
    },
    {
      id: 12,
      name: 'Krisna Aditya',
      gender: 'L',
      photo: '/public/avatar-default.png',
      quote: 'Think logically, code creatively.'
    },
    {
      id: 13,
      name: 'Laras Salsabila',
      gender: 'P',
      photo: '/public/avatar-default.png',
      quote: 'Kolaborasi membuat kode lebih kuat.'
    },
    {
      id: 14,
      name: 'M Fikri',
      gender: 'L',
      photo: '/public/avatar-default.png',
      quote: 'Semua aplikasi besar dimulai dari “Hello, World!”.'
    },
    {
      id: 15,
      name: 'Nadia Rahma',
      gender: 'P',
      photo: '/public/avatar-default.png',
      quote: 'Jangan takut error, takutlah kalau tidak mencoba.'
    },
    {
      id: 16,
      name: 'Oka Pradana',
      gender: 'L',
      photo: '/public/avatar-default.png',
      quote: 'Performance matters.'
    },
    {
      id: 17,
      name: 'Putri Ayuning',
      gender: 'P',
      photo: '/public/avatar-default.png',
      quote: 'Satu commit kecil setiap hari.'
    },
    {
      id: 18,
      name: 'Qori Nurhayati',
      gender: 'P',
      photo: '/public/avatar-default.png',
      quote: 'Desain bukan hanya cantik, tapi juga fungsional.'
    },
    {
      id: 19,
      name: 'Rafi Maulana',
      gender: 'L',
      photo: '/public/avatar-default.png',
      quote: 'Latihan algoritma seperti olahraga otak.'
    },
    {
      id: 20,
      name: 'Salsa Dewi',
      gender: 'P',
      photo: '/public/avatar-default.png',
      quote: 'Detail kecil, pengalaman besar.'
    },
    {
      id: 21,
      name: 'Tegar Prasetyo',
      gender: 'L',
      photo: '/public/avatar-default.png',
      quote: 'Backend rapi, hidup nyaman.'
    },
    {
      id: 22,
      name: 'Umar Sulaiman',
      gender: 'L',
      photo: '/public/avatar-default.png',
      quote: 'Selalu penasaran bagaimana sesuatu bekerja.'
    },
    {
      id: 23,
      name: 'Vania Putri',
      gender: 'P',
      photo: '/public/avatar-default.png',
      quote: 'Coding itu seperti puzzle, tinggal sabar merangkai.'
    },
    {
      id: 24,
      name: 'Wildan Syah',
      gender: 'L',
      photo: '/public/avatar-default.png',
      quote: 'Belajar debugging lebih penting dari menghafal sintaks.'
    },
    {
      id: 25,
      name: 'Xaviera Rizki',
      gender: 'P',
      photo: '/public/avatar-default.png',
      quote: 'Setiap desain punya cerita.'
    },
    {
      id: 26,
      name: 'Yusuf Alamsyah',
      gender: 'L',
      photo: '/public/avatar-default.png',
      quote: 'Fokus pada proses, bukan hanya hasil.'
    },
    {
      id: 27,
      name: 'Zahra Khairunnisa',
      gender: 'P',
      photo: '/public/avatar-default.png',
      quote: 'Belajar teknologi, membangun masa depan.'
    },
    {
      id: 28,
      name: 'Adelina Sari',
      gender: 'P',
      photo: '/public/avatar-default.png',
      quote: 'Konsistensi mengalahkan bakat.'
    },
    {
      id: 29,
      name: 'Bimo Satriya',
      gender: 'L',
      photo: '/public/avatar-default.png',
      quote: 'Error hari ini, pelajaran untuk besok.'
    },
    {
      id: 30,
      name: 'Chika Amelia',
      gender: 'P',
      photo: '/public/avatar-default.png',
      quote: 'Jangan menyerah sebelum mencoba semua cara.'
    },
    {
      id: 31,
      name: 'Dimas Pradipta',
      gender: 'L',
      photo: '/public/avatar-default.png',
      quote: 'Logic dulu, baru koding.'
    },
    {
      id: 32,
      name: 'Erika Juniar',
      gender: 'P',
      photo: '/public/avatar-default.png',
      quote: 'Kolaborasi membuat project lebih menyenangkan.'
    },
    {
      id: 33,
      name: 'Fadhil Arif',
      gender: 'L',
      photo: '/public/avatar-default.png',
      quote: 'Belajar dari bug sendiri dan bug teman.'
    },
    {
      id: 34,
      name: 'Gita Maharani',
      gender: 'P',
      photo: '/public/avatar-default.png',
      quote: 'UI adalah bahasa visual aplikasi.'
    },
    {
      id: 35,
      name: 'Hafiz Ramdhan',
      gender: 'L',
      photo: '/public/avatar-default.png',
      quote: 'Refactor bukan pilihan, tapi kebutuhan.'
    },
    {
      id: 36,
      name: 'Intan Nurul',
      gender: 'P',
      photo: '/public/avatar-default.png',
      quote: 'Setiap line of code harus punya tujuan.'
    }
  ];
  
  export default students;
  