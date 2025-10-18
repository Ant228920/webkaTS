import React from 'react'

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

const UserCard: React.FC<UserCardProps> = ({ user }) => {
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

export default UserCard