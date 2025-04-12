import React, { useState } from 'react';
import {
  Home,
  Bell,
  Calendar,
  Users,
  MessageSquare,
  LogOut,
  BarChart,
  Hotel,
  Settings,
  ChevronRight,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Edit,
  Trash2,
  Send,
  FileText,
  Star,
  X,
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingType: 'room' | 'spa' | 'activity' | 'dining';
  itemName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  guests?: number;
  specialRequests?: string;
}

interface Feedback {
  id: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  comment: string;
  date: string;
  status: 'pending' | 'replied';
  reply?: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'event' | 'promotion' | 'maintenance';
}

interface HotelStatus {
  occupancyRate: number;
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  revenue: number;
  topBookedItems: { name: string; count: number }[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
}

interface TaskFormData {
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Room Cleaning',
      description: 'Clean and prepare Lake View Suite for new guests',
      assignedTo: 'Sarah Johnson',
      dueDate: '2023-06-15',
      priority: 'high',
      status: 'pending',
      createdAt: '2023-06-14',
    },
    {
      id: '2',
      title: 'Spa Setup',
      description: 'Prepare spa area for Ethiopian Coffee Ritual treatment',
      assignedTo: 'Michael Brown',
      dueDate: '2023-06-16',
      priority: 'medium',
      status: 'in-progress',
      createdAt: '2023-06-13',
    },
    {
      id: '3',
      title: 'Restaurant Inventory',
      description: 'Check and restock inventory for Lakeside Restaurant',
      assignedTo: 'Emily Davis',
      dueDate: '2023-06-17',
      priority: 'low',
      status: 'pending',
      createdAt: '2023-06-14',
    },
  ]);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskFormData, setTaskFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending',
  });

  // Mock data for bookings
  const bookings: Booking[] = [
    {
      id: '1',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      customerPhone: '+1234567890',
      bookingType: 'room',
      itemName: 'Lake View Suite',
      date: '2023-06-15',
      time: '14:00',
      status: 'confirmed',
      guests: 2,
      specialRequests: 'Late check-in requested',
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      customerPhone: '+1234567891',
      bookingType: 'spa',
      itemName: 'Ethiopian Coffee Ritual',
      date: '2023-06-16',
      time: '10:00',
      status: 'pending',
    },
    {
      id: '3',
      customerName: 'Bob Johnson',
      customerEmail: 'bob@example.com',
      customerPhone: '+1234567892',
      bookingType: 'activity',
      itemName: 'Lake Tana Boat Tour',
      date: '2023-06-17',
      time: '09:00',
      status: 'confirmed',
      guests: 4,
    },
    {
      id: '4',
      customerName: 'Alice Brown',
      customerEmail: 'alice@example.com',
      customerPhone: '+1234567893',
      bookingType: 'dining',
      itemName: 'Lakeside Restaurant',
      date: '2023-06-18',
      time: '19:00',
      status: 'cancelled',
      guests: 2,
      specialRequests: 'Window seat requested',
    },
  ];

  // Mock data for feedback
  const feedbacks: Feedback[] = [
    {
      id: '1',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      rating: 5,
      comment: 'Amazing experience! The staff was very friendly and the room was beautiful.',
      date: '2023-06-10',
      status: 'replied',
      reply: 'Thank you for your kind words! We look forward to welcoming you back soon.',
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      rating: 4,
      comment: 'Great stay overall, but the breakfast could be improved.',
      date: '2023-06-11',
      status: 'pending',
    },
    {
      id: '3',
      customerName: 'Bob Johnson',
      customerEmail: 'bob@example.com',
      rating: 3,
      comment: 'The spa service was good, but the waiting time was too long.',
      date: '2023-06-12',
      status: 'pending',
    },
  ];

  // Mock data for announcements
  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'Summer Special Event',
      content: 'Join us for our annual summer celebration with live music, food, and drinks.',
      date: '2023-07-15',
      type: 'event',
    },
    {
      id: '2',
      title: '20% Off Spa Treatments',
      content: 'Book any spa treatment and get 20% off for the month of June.',
      date: '2023-06-01',
      type: 'promotion',
    },
    {
      id: '3',
      title: 'Pool Maintenance',
      content: 'The main pool will be closed for maintenance from June 20-22.',
      date: '2023-06-20',
      type: 'maintenance',
    },
  ];

  // Mock data for hotel status
  const hotelStatus: HotelStatus = {
    occupancyRate: 75,
    totalBookings: 120,
    pendingBookings: 15,
    confirmedBookings: 100,
    cancelledBookings: 5,
    revenue: 25000,
    topBookedItems: [
      { name: 'Lake View Suite', count: 45 },
      { name: 'Ethiopian Coffee Ritual', count: 30 },
      { name: 'Lake Tana Boat Tour', count: 25 },
      { name: 'Lakeside Restaurant', count: 20 },
    ],
  };

  // Mock data for employees
  const employees = [
    'Sarah Johnson',
    'Michael Brown',
    'Emily Davis',
    'John Smith',
    'Lisa Anderson',
  ];

  // Filter bookings based on search term and status
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Filter feedbacks based on search term and status
  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = 
      feedback.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || feedback.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleTaskFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskFormData,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTasks(prev => [...prev, newTask]);
    setIsTaskModalOpen(false);
    resetTaskForm();
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setTaskFormData({
      title: task.title,
      description: task.description,
      assignedTo: task.assignedTo,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
    });
    setIsTaskModalOpen(true);
  };

  const handleUpdateTask = () => {
    if (!editingTask) return;
    
    setTasks(prev => prev.map(task => 
      task.id === editingTask.id
        ? { ...task, ...taskFormData }
        : task
    ));
    setIsTaskModalOpen(false);
    setEditingTask(null);
    resetTaskForm();
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const resetTaskForm = () => {
    setTaskFormData({
      title: '',
      description: '',
      assignedTo: '',
      dueDate: '',
      priority: 'medium',
      status: 'pending',
    });
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
    resetTaskForm();
  };

  // Render the home page with hotel status
  const renderHomePage = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Hotel Dashboard</h2>
        <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Occupancy Rate</h3>
            <Hotel className="w-5 h-5 text-purple-600" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">{hotelStatus.occupancyRate}%</div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-purple-600 rounded-full" 
                style={{ width: `${hotelStatus.occupancyRate}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Total Bookings</h3>
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">{hotelStatus.totalBookings}</div>
            <div className="mt-2 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Confirmed: {hotelStatus.confirmedBookings}</span>
                <span>Pending: {hotelStatus.pendingBookings}</span>
                <span>Cancelled: {hotelStatus.cancelledBookings}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Revenue</h3>
            <BarChart className="w-5 h-5 text-green-600" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">${hotelStatus.revenue.toLocaleString()}</div>
            <div className="mt-2 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="text-green-500 mr-1">↑ 12%</span>
                <span>from last month</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Active Announcements</h3>
            <Bell className="w-5 h-5 text-amber-600" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">{announcements.length}</div>
            <div className="mt-2 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="text-amber-500 mr-1">•</span>
                <span>{announcements.filter(a => a.type === 'event').length} events</span>
              </div>
              <div className="flex items-center">
                <span className="text-amber-500 mr-1">•</span>
                <span>{announcements.filter(a => a.type === 'promotion').length} promotions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Top Booked Items</h3>
          <div className="space-y-4">
            {hotelStatus.topBookedItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold">
                    {index + 1}
                  </div>
                  <span className="ml-3">{item.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">{item.count} bookings</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-purple-600 rounded-full" 
                      style={{ width: `${(item.count / hotelStatus.topBookedItems[0].count) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
          <div className="space-y-4">
            {bookings.slice(0, 5).map(booking => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{booking.customerName}</div>
                  <div className="text-sm text-gray-500">{booking.itemName}</div>
                </div>
                <div className="flex items-center">
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Render the bookings page
  const renderBookingsPage = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Bookings</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search bookings..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <div className="relative">
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <Filter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map(booking => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                    <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                    <div className="text-sm text-gray-500">{booking.customerPhone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">{booking.bookingType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.itemName}</div>
                    {booking.guests && (
                      <div className="text-sm text-gray-500">{booking.guests} guests</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.date}</div>
                    <div className="text-sm text-gray-500">{booking.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`px-2 py-1 rounded-full text-xs inline-block ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-purple-600 hover:text-purple-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render the announcements page
  const renderAnnouncementsPage = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Announcements</h2>
        <button className="flex items-center space-x-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Announcement</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.map(announcement => (
          <div key={announcement.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className={`p-4 ${
              announcement.type === 'event' ? 'bg-blue-600' :
              announcement.type === 'promotion' ? 'bg-green-600' :
              'bg-amber-600'
            }`}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">{announcement.title}</h3>
                <div className={`px-2 py-1 rounded-full text-xs bg-white ${
                  announcement.type === 'event' ? 'text-blue-600' :
                  announcement.type === 'promotion' ? 'text-green-600' :
                  'text-amber-600'
                }`}>
                  {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-4">{announcement.content}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{announcement.date}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-purple-600 hover:text-purple-900">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render the feedback page
  const renderFeedbackPage = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Feedback</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search feedback..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <div className="relative">
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="replied">Replied</option>
            </select>
            <Filter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredFeedbacks.map(feedback => (
          <div key={feedback.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{feedback.customerName}</h3>
                  <div className="text-sm text-gray-500">{feedback.customerEmail}</div>
                </div>
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{feedback.date}</span>
                <div className={`ml-4 px-2 py-1 rounded-full text-xs ${
                  feedback.status === 'replied' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-4">{feedback.comment}</p>
              
              {feedback.status === 'replied' && feedback.reply && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-1">Your Reply:</div>
                  <p className="text-gray-600">{feedback.reply}</p>
                </div>
              )}
              
              {feedback.status === 'pending' && (
                <div className="mt-4">
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    rows={3}
                    placeholder="Write your reply..."
                  ></textarea>
                  <div className="mt-2 flex justify-end">
                    <button className="flex items-center space-x-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      <Send className="w-4 h-4" />
                      <span>Send Reply</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render the tasks page
  const renderTasksPage = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Employee Tasks</h2>
        <button
          onClick={() => {
            setEditingTask(null);
            resetTaskForm();
            setIsTaskModalOpen(true);
          }}
          className="flex items-center space-x-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(task => (
          <div key={task.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{task.assignedTo}</span>
                </div>
                <div className="flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Due: {task.dueDate}</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-4">{task.description}</p>
              <div className="flex justify-between items-center">
                <div className={`px-2 py-1 rounded-full text-xs ${
                  task.status === 'completed' ? 'bg-green-100 text-green-800' :
                  task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditTask(task)}
                    className="text-purple-600 hover:text-purple-900"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isTaskModalOpen && renderTaskModal()}
    </div>
  );

  // Render the task form modal
  const renderTaskModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {editingTask ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            onClick={closeTaskModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={taskFormData.title}
              onChange={handleTaskFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={taskFormData.description}
              onChange={handleTaskFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              rows={3}
              placeholder="Enter task description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign To
            </label>
            <select
              name="assignedTo"
              value={taskFormData.assignedTo}
              onChange={handleTaskFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="">Select employee</option>
              {employees.map(employee => (
                <option key={employee} value={employee}>
                  {employee}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={taskFormData.dueDate}
              onChange={handleTaskFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={taskFormData.priority}
              onChange={handleTaskFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={taskFormData.status}
              onChange={handleTaskFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={closeTaskModal}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={editingTask ? handleUpdateTask : handleCreateTask}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {editingTask ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </div>
    </div>
  );

  // Render the main content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomePage();
      case 'bookings':
        return renderBookingsPage();
      case 'announcements':
        return renderAnnouncementsPage();
      case 'feedback':
        return renderFeedbackPage();
      case 'tasks':
        return renderTasksPage();
      default:
        return renderHomePage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <Hotel className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-bold">Admin Panel</span>
          </div>
        </div>
        
        <div className="px-4 py-2">
          <div className="space-y-1">
            <button
              className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg ${
                activeTab === 'home' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('home')}
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
              {activeTab === 'home' && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
            
            <button
              className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg ${
                activeTab === 'bookings' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('bookings')}
            >
              <Calendar className="w-5 h-5" />
              <span>Bookings</span>
              {activeTab === 'bookings' && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
            
            <button
              className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg ${
                activeTab === 'announcements' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('announcements')}
            >
              <Bell className="w-5 h-5" />
              <span>Announcements</span>
              {activeTab === 'announcements' && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
            
            <button
              className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg ${
                activeTab === 'feedback' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('feedback')}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Feedback</span>
              {activeTab === 'feedback' && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
            
            <button
              className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg ${
                activeTab === 'tasks' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('tasks')}
            >
              <FileText className="w-5 h-5" />
              <span>Tasks</span>
              {activeTab === 'tasks' && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <button
            className="w-full flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={onLogout}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 