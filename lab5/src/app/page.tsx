'use client'
import React, { useState } from 'react'

interface User {
  firstName: string
  lastName: string
  gender: string
  age: number
  position: string
  photo: string
  hobbies: string[]
}

interface UserCardProps {
  user: User
}

const users: User[] = [
  {
    firstName: 'Олексій',
    lastName: 'Петренко',
    gender: 'male',
    age: 25,
    position: 'Frontend Developer',
    photo: 'https://randomuser.me/api/portraits/men/10.jpg',
    hobbies: ['Футбол', 'Музика', 'Програмування'],
  },
  {
    firstName: 'Марина',
    lastName: 'Коваленко',
    gender: 'female',
    age: 19,
    position: 'UI/UX Designer',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    hobbies: ['Малювання', 'Подорожі', 'Фотографія'],
  },
  {
    firstName: 'Ігор',
    lastName: 'Сидоренко',
    gender: 'male',
    age: 42,
    position: 'Project Manager',
    photo: 'https://randomuser.me/api/portraits/men/25.jpg',
    hobbies: ['Гольф', 'Бізнес книги', 'Плавання'],
  },
  {
    firstName: 'Анна',
    lastName: 'Гончар',
    gender: 'female',
    age: 32,
    position: 'QA Engineer',
    photo: 'https://randomuser.me/api/portraits/women/55.jpg',
    hobbies: ['Читання', 'Кулінарія', 'Подорожі'],
  },
  {
    firstName: 'Дмитро',
    lastName: 'Мельник',
    gender: 'male',
    age: 20,
    position: 'Backend Developer',
    photo: 'https://randomuser.me/api/portraits/men/50.jpg',
    hobbies: ['Гітари', 'Ігри', 'Велосипед'],
  },
  {
    firstName: 'Ольга',
    lastName: 'Шевченко',
    gender: 'female',
    age: 45,
    position: 'Team Lead',
    photo: 'https://randomuser.me/api/portraits/women/42.jpg',
    hobbies: ['Психологія', 'Йога', 'Піші прогулянки'],
  },
  {
    firstName: 'Сергій',
    lastName: 'Кравчук',
    gender: 'male',
    age: 29,
    position: 'DevOps Engineer',
    photo: 'https://randomuser.me/api/portraits/men/18.jpg',
    hobbies: ['Кулінарія', 'Кемпінг', 'Музика'],
  },
  {
    firstName: 'Катерина',
    lastName: 'Бондар',
    gender: 'female',
    age: 22,
    position: 'Marketing Specialist',
    photo: 'https://randomuser.me/api/portraits/women/61.jpg',
    hobbies: ['Соцмережі', 'Малювання', 'Мандрівки'],
  },
  {
    firstName: 'Володимир',
    lastName: 'Захаренко',
    gender: 'male',
    age: 34,
    position: 'Full Stack Developer',
    photo: 'https://randomuser.me/api/portraits/men/70.jpg',
    hobbies: ['Футбол', 'Книги', 'Біг'],
  },
  {
    firstName: 'Юлія',
    lastName: 'Литвин',
    gender: 'female',
    age: 27,
    position: 'Data Analyst',
    photo: 'https://randomuser.me/api/portraits/women/66.jpg',
    hobbies: ['Математика', 'Аналітика', 'Подорожі'],
  },
]

const UserCard = ({ user }: UserCardProps) => {
  return (
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 border border-gray-100">
        <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
          <img
              src={user.photo}
              alt={`${user.firstName} ${user.lastName}`}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className="pt-20 pb-6 px-6 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-sm text-purple-600 font-medium mb-2">{user.position}</p>
          <p className="text-xs text-gray-500 mb-4">{user.age} років</p>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-xs text-gray-600 font-semibold mb-2">Хобі:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {user.hobbies.map((hobby, index) => (
                  <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-purple-700 rounded-full text-xs font-medium border border-purple-200"
                  >
                {hobby}
              </span>
              ))}
            </div>
          </div>
        </div>
      </div>
  )
}

export default function HomePage() {
  const [filter, setFilter] = useState('all')

  const filteredUsers =
      filter === 'all' ? users : users.filter(u => u.gender === filter)

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Наша команда
            </h1>
            <p className="text-blue-600 text-lg">Познайомтесь з нашими талановитими спеціалістами</p>
          </div>

          <div className="flex justify-center gap-4 mb-12">
            <button
                onClick={() => setFilter('all')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-xl ${
                    filter === 'all'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              Всі ({users.length})
            </button>
            <button
                onClick={() => setFilter('male')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-xl ${
                    filter === 'male'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              Чоловіки ({users.filter(u => u.gender === 'male').length})
            </button>
            <button
                onClick={() => setFilter('female')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-xl ${
                    filter === 'female'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              Жінки ({users.filter(u => u.gender === 'female').length})
            </button>
          </div>

          {filteredUsers.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-xl">Список користувачів порожній</p>
              </div>
          ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredUsers.map((user, i) => (
                    <UserCard key={i} user={user} />
                ))}
              </div>
          )}
        </div>
      </div>
  )
}