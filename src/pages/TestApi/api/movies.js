export const User = async () => {
    return [
        {
            "id": 1,
            "email": "admin@example.com",
            "password": "hashed_password1",
            "role": "admin",
            "created_at": "2024-01-01T12:00:00Z",
            "updated_at": "2024-01-01T12:00:00Z"
          },
          {
            "id": 2,
            "email": "user1@example.com",
            "password": "hashed_password2",
            "role": "user",
            "created_at": "2024-01-02T12:00:00Z",
            "updated_at": "2024-01-02T12:00:00Z"
          }
    ];
  };

  export const Genre = async () => {
    return [
        {
            "id": 1,
            "name": "Hành động",
            "created_at": "2024-01-01T12:00:00Z",
            "updated_at": "2024-01-01T12:00:00Z"
          },
          {
            "id": 2,
            "name": "Hài",
            "created_at": "2024-01-01T12:00:00Z",
            "updated_at": "2024-01-01T12:00:00Z"
          }
    ];
  };

  export const Movie = async () => {
    return [
        {
            "id": 1,
            "title": "Phim Hành Động 1",
            "description": "Một bộ phim hành động gay cấn.",
            "release_date": "2024-05-01",
            "duration": 120,
            "image_url": "https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg",
            "created_at": "2024-01-01T12:00:00Z",
            "updated_at": "2024-01-01T12:00:00Z"
        },
        {
            "id": 2,
            "title": "Phim Hài 1",
            "description": "Một bộ phim hài thú vị.",
            "release_date": "2024-06-01",
            "duration": 90,
            "image_url": "https://cms-assets.webediamovies.pro/cdn-cgi/image/dpr=1,fit=scale-down,gravity=auto,metadata=none,quality=85,width=2500/production/4756/da6d320019b0cffcb187e7a20bf9cdcb.jpg",
            "created_at": "2024-01-01T12:00:00Z",
            "updated_at": "2024-01-01T12:00:00Z"
        }
    ];
};

  export const Movie_Genre = async () => {
    return [
        {
            "id": 1,
            "movie_id": 1,
            "genre_id": 1
          },
          {
            "id": 2,
            "movie_id": 1,
            "genre_id": 2
          },
          {
            "id": 3,
            "movie_id": 2,
            "genre_id": 2
          }
    ];
  };

  export const Actor = async () => {
    return [
        {
            "id": 1,
            "name": "Diễn viên 1",
            "birthdate": "1980-01-01",
            "biography": "Diễn viên nổi tiếng trong các bộ phim hành động.",
            "image_url": "https://example.com/actor1.jpg",
            "created_at": "2024-01-01T12:00:00Z",
            "updated_at": "2024-01-01T12:00:00Z"
          },
          {
            "id": 2,
            "name": "Diễn viên 2",
            "birthdate": "1990-01-01",
            "biography": "Diễn viên hài nổi tiếng.",
            "image_url": "https://example.com/actor2.jpg",
            "created_at": "2024-01-01T12:00:00Z",
            "updated_at": "2024-01-01T12:00:00Z"
          }
    ];
  };

  export const Movie_Actor = async () => {
    return [
        {
            "id": 1,
            "movie_id": 1,
            "actor_id": 1,
            "role": "Vai chính"
          },
          {
            "id": 2,
            "movie_id": 2,
            "actor_id": 2,
            "role": "Vai phụ"
          },
          {
            "id": 3,
            "movie_id": 1,
            "actor_id": 2,
            "role": "Vai phụ"
          }
    ];
  };

  export const Region = async () => {
    return [
        {
            "id": 1,
            "name": "Hà Nội",
            "created_at": "2024-01-01T12:00:00Z",
            "updated_at": "2024-01-01T12:00:00Z"
          },
          {
            "id": 2,
            "name": "TP.HCM",
            "created_at": "2024-01-01T12:00:00Z",
            "updated_at": "2024-01-01T12:00:00Z"
          }
    ];
  };

  export const Cinema = async () => {
    return [
        {
            "id": 1,
            "name": "Rạp Chiếu 1",
            "address": "123 Đường A, Hà Nội",
            "region_id": 1,
            "created_at": "2024-01-01T12:00:00Z",
            "updated_at": "2024-01-01T12:00:00Z"
          },
          {
            "id": 2,
            "name": "Rạp Chiếu 2",
            "address": "456 Đường B, TP.HCM",
            "region_id": 2,
            "created_at": "2024-01-01T12:00:00Z",
            "updated_at": "2024-01-01T12:00:00Z"
          }
    ];
  };

  export const Room = async () => {
    return [
        {
            "id": 1,
            "cinema_id": 1,
            "name": "Phòng 1",
            "capacity": 100,
            "created_at": "2024-01-01T12:00:00Z",
            "updated_at": "2024-01-01T12:00:00Z"
          },
          {
            "id": 2,
            "cinema_id": 2,
            "name": "Phòng 2",
            "capacity": 150,
            "created_at": "2024-01-01T12:00:00Z",
            "updated_at": "2024-01-01T12:00:00Z"
          }
    ];
  };

  export const Seat = async () => {
    const seatsRoom1 = [];
    const seatsRoom2 = [];
  
    // Phòng 1
    for (let row of ['A', 'B', 'C', 'D']) {
      for (let number = 1; number <= 20; number++) {
        const seat = {
          id: seatsRoom1.length + 1,
          room_id: 1,
          row: row,
          number: number,
          type: 'regular', // Ghế thường
          created_at: "2024-01-01T12:00:00Z",
          updated_at: "2024-01-01T12:00:00Z",
        };
        seatsRoom1.push(seat);
      }
    }
  
    // Dãy E, F, G: ghế VIP
    for (let row of ['E', 'F', 'G']) {
      for (let number = 1; number <= 20; number++) {
        const seat = {
          id: seatsRoom1.length + 1,
          room_id: 1,
          row: row,
          number: number,
          type: 'vip', // Ghế VIP
          created_at: "2024-01-01T12:00:00Z",
          updated_at: "2024-01-01T12:00:00Z",
        };
        seatsRoom1.push(seat);
      }
    }
  
    // Dãy H: ghế sweetbox
    for (let i = 1; i <= 8; i++) {
      seatsRoom1.push({
        id: seatsRoom1.length + 1,
        room_id: 1,
        row: 'H',
        number: i,
        type: 'sweetbox', // Ghế đôi
        created_at: "2024-01-01T12:00:00Z",
        updated_at: "2024-01-01T12:00:00Z",
      });
    }
  
    // Phòng 2
    for (let row of ['A', 'B', 'C']) {
      for (let number = 1; number <= 18; number++) {
        const seat = {
          id: seatsRoom2.length + 1,
          room_id: 2,
          row: row,
          number: number,
          type: 'regular', // Ghế thường
          created_at: "2024-01-01T12:00:00Z",
          updated_at: "2024-01-01T12:00:00Z",
        };
        seatsRoom2.push(seat);
      }
    }
  
    for (let row of ['D', 'E', 'F', 'G']) {
      for (let number = 1; number <= 20; number++) {
        const seat = {
          id: seatsRoom2.length + 1,
          room_id: 2,
          row: row,
          number: number,
          type: 'vip', // Ghế thường
          created_at: "2024-01-01T12:00:00Z",
          updated_at: "2024-01-01T12:00:00Z",
        };
        seatsRoom2.push(seat);
      }
    }
  
    // Dãy H: ghế sweetbox
    for (let i = 1; i < 8; i ++) {
      seatsRoom2.push({
        id: seatsRoom2.length + 1,
        room_id: 2,
        row: 'H',
        number: i,
        type: 'sweetbox', // Ghế đôi
        created_at: "2024-01-01T12:00:00Z",
        updated_at: "2024-01-01T12:00:00Z",
      });
    }
  
  
  
    // Thêm vài ghế đã đặt cho phòng 1
    const bookedSeatsRoom1 = [
      { id: 1, row: 'A', number: 1 },
      { id: 2, row: 'B', number: 5 },
      { id: 3, row: 'C', number: 10 },
      { id: 4, row: 'E', number: 1 },
      { id: 5, row: 'H', number: 1 },
    ];
  
    // Đánh dấu ghế đã đặt cho phòng 1
    bookedSeatsRoom1.forEach(seat => {
      const found = seatsRoom1.find(s => s.row === seat.row && s.number === seat.number);
      if (found) {
        found.status = 'booked';
      }
    });
  
    // Thêm vài ghế đã đặt cho phòng 2
    const bookedSeatsRoom2 = [
      { id: 1, row: 'A', number: 1 },
      { id: 2, row: 'B', number: 4 },
      { id: 3, row: 'C', number: 12 },
      { id: 4, row: 'E', number: 1 },
      { id: 5, row: 'H', number: 2 },
    ];
  
    // Đánh dấu ghế đã đặt cho phòng 2
    bookedSeatsRoom2.forEach(seat => {
      const found = seatsRoom2.find(s => s.row === seat.row && s.number === seat.number);
      if (found) {
        found.status = 'booked';
      }
    });
  
    return [...seatsRoom1, ...seatsRoom2];
  };
  

  export const Showtime = async () => {
    return [
        {
            "id": 1,
            "movie_id": 1,
            "room_id": 1,
            "cinema_id": 1,
            "start_time": "2024-05-02T21:00:00+07:00",
            "end_time": "2024-05-02T23:00:00+07:00",
            "created_at": "2024-01-01T19:00:00+07:00",
            "updated_at": "2024-01-01T19:00:00+07:00"
        },
        {
            "id": 2,
            "movie_id": 1,
            "room_id": 1,
            "cinema_id": 2,
            "start_time": "2024-05-02T00:00:00+07:00",
            "end_time": "2024-05-03T02:00:00+07:00",
            "created_at": "2024-01-01T19:00:00+07:00",
            "updated_at": "2024-01-01T19:00:00+07:00"
        },
        {
            "id": 3,
            "movie_id": 2,
            "room_id": 2,
            "cinema_id": 1,
            "start_time": "2024-06-02T01:00:00+07:00",
            "end_time": "2024-06-02T02:30:00+07:00",
            "created_at": "2024-01-01T19:00:00+07:00",
            "updated_at": "2024-01-01T19:00:00+07:00"
        },
        {
            "id": 4,
            "movie_id": 2,
            "room_id": 2,
            "cinema_id": 2,
            "start_time": "2024-06-02T03:00:00+07:00",
            "end_time": "2024-06-02T04:30:00+07:00", 
            "created_at": "2024-01-01T19:00:00+07:00",
            "updated_at": "2024-01-01T19:00:00+07:00"
        },
        {
          "id": 5,
          "movie_id": 1,
          "room_id": 2,
          "cinema_id": 1,
          "start_time": "2024-05-02T00:00:00+07:00",
          "end_time": "2024-05-02T02:00:00+07:00",
          "created_at": "2024-01-01T19:00:00+07:00",
          "updated_at": "2024-01-01T19:00:00+07:00"
      },
    ];
};

  export const Ticket = async () => {
    return [
        {
            "id": 1,
            "user_id": 2,
            "showtime_id": 1,
            "total_price": 100000.00,
            "status": "paid",
            "created_at": "2024-01-01T12:00:00Z",
            "updated_at": "2024-01-01T12:00:00Z"
          }
    ];
  };

  export const Ticket_Seat = async () => {
    return [
        {
            "id": 1,
            "ticket_id": 1,
            "seat_id": 1
          },
          {
            "id": 2,
            "ticket_id": 1,
            "seat_id": 2
          }
    ];
  };

  export const Payment = async () => {
    return [
        {
            "id": 1,
            "ticket_id": 1,
            "amount": 100000.00,
            "payment_method": "Credit card",
            "payment_date": "2024-01-01T12:00:00Z",
            "status": "success",
            "created_at": "2024-01-01T12:00:00Z",
            "updated_at": "2024-01-01T12:00:00Z"
          }
    ];
  };

  export const Voucher = async () => {
    return [
        {
            "id": 1,
            "code": "DISCOUNT10",
            "discount": 10,
            "expiration_date": "2024-12-31T23:59:59Z",
            "created_at": "2024-01-01T12:00:00Z",
            "updated_at": "2024-01-01T12:00:00Z"
          }
    ];
  };
  
  