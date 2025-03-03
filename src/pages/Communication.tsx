import React, { useState } from 'react';
import { ChatModule } from '../components/ChatModule';
import { TicketSystem } from '../components/TicketSystem';
import { VideoConference } from '../components/VideoConference';
import { NotificationSystem } from '../components/NotificationSystem';
import { MessageSquare, Video, AlertCircle, Bell } from 'lucide-react';

export const Communication: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'tickets' | 'video' | 'notifications'>('chat');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Communication</h1>
              <p className="mt-1 text-sm text-gray-500">
                Communiquez avec l'équipe Prévéris et suivez vos demandes.
              </p>
            </div>
            <div className="hidden sm:flex space-x-3">
              <NotificationSystem />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('chat')}
              className={`${
                activeTab === 'chat'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              <MessageSquare className="h-5 w-5 mx-auto mb-1" />
              <span>Messages</span>
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`${
                activeTab === 'tickets'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              <AlertCircle className="h-5 w-5 mx-auto mb-1" />
              <span>Tickets</span>
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`${
                activeTab === 'video'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              <Video className="h-5 w-5 mx-auto mb-1" />
              <span>Visioconférence</span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`${
                activeTab === 'notifications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm sm:hidden`}
            >
              <Bell className="h-5 w-5 mx-auto mb-1" />
              <span>Notifications</span>
            </button>
          </nav>
        </div>

        {/* Tab content */}
        <div>
          {activeTab === 'chat' && <ChatModule />}
          {activeTab === 'tickets' && <TicketSystem />}
          {activeTab === 'video' && <VideoConference />}
          {activeTab === 'notifications' && (
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
              {/* Mobile notifications view */}
              <div className="sm:hidden">
                {/* Notification list would go here */}
                <p className="text-gray-500">Vos notifications récentes apparaîtront ici.</p>
              </div>
              <div className="hidden sm:block">
                <p className="text-gray-500">Utilisez l'icône de notification en haut à droite pour voir vos notifications.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};