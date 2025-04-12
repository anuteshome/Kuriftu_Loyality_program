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
  Briefcase,
  ClipboardCheck,
  UserCheck,
  AlertCircle,
} from 'lucide-react';

interface EmployeeDashboardProps {
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
  assignedTo?: string;
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
  assignedTo?: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo: string;
}

interface EmployeeStats {
  tasksCompleted: number;
  pendingTasks: number;
  bookingsHandled: number;
  feedbackResponded: number;
  upcomingTasks: Task[];
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

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
      assignedTo: 'Sarah Johnson',
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
      assignedTo: 'Sarah Johnson',
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
      assignedTo: 'Michael Brown',
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
      assignedTo: 'Sarah Johnson',
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
      assignedTo: 'Sarah Johnson',
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      rating: 4,
      comment: 'Great stay overall, but the breakfast could be improved.',
      date: '2023-06-11',
      status: 'pending',
      assignedTo: 'Sarah Johnson',
    },
    {
      id: '3',
      customerName: 'Bob Johnson',
      customerEmail: 'bob@example.com',
      rating: 3,
      comment: 'The spa service was good, but the waiting time was too long.',
      date: '2023-06-12',
      status: 'pending',
      assignedTo: 'Michael Brown',
    },
  ];

  // Mock data for tasks
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Prepare welcome package for VIP guests',
      description: 'Create personalized welcome packages for the VIP guests arriving tomorrow.',
      dueDate: '2023-06-15',
      priority: 'high',
      status: 'pending',
      assignedTo: 'Sarah Johnson',
    },
    {
      id: '2',
      title: 'Update spa menu',
      description: 'Update the spa menu with new seasonal treatments.',
      dueDate: '2023-06-20',
      priority: 'medium',
      status: 'in-progress',
      assignedTo: 'Sarah Johnson',
    },
    {
      id: '3',
      title: 'Staff meeting',
      description: 'Weekly staff meeting to discuss upcoming events and guest feedback.',
      dueDate: '2023-06-14',
      priority: 'low',
      status: 'completed',
      assignedTo: 'Sarah Johnson',
    },
    {
      id: '4',
      title: 'Inventory check',
      description: 'Check inventory for restaurant supplies and place orders if needed.',
      dueDate: '2023-06-18',
      priority: 'medium',
      status: 'pending',
      assignedTo: 'Michael Brown',
    },
  ];

  // Mock data for employee stats
  const employeeStats: EmployeeStats = {
    tasksCompleted: 12,
    pendingTasks: 5,
    bookingsHandled: 28,
    feedbackResponded: 15,
    upcomingTasks: tasks.filter(task => task.status !== 'completed').slice(0, 3),
  };

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

  // Render the home page with employee stats and tasks
  const renderHomePage = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Employee Dashboard</h2>
        <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Tasks Completed</h3>
            <ClipboardCheck className="w-5 h-5 text-green-600" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">{employeeStats.tasksCompleted}</div>
            <div className="mt-2 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="text-green-500 mr-1">↑ 8%</span>
                <span>from last week</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Pending Tasks</h3>
            <AlertCircle className="w-5 h-5 text-amber-600" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">{employeeStats.pendingTasks}</div>
            <div className="mt-2 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="text-amber-500 mr-1">•</span>
                <span>{tasks.filter(t => t.priority === 'high').length} high priority</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Bookings Handled</h3>
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">{employeeStats.bookingsHandled}</div>
            <div className="mt-2 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="text-blue-500 mr-1">↑ 15%</span>
                <span>from last month</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Feedback Responded</h3>
            <MessageSquare className="w-5 h-5 text-purple-600" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">{employeeStats.feedbackResponded}</div>
            <div className="mt-2 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="text-purple-500 mr-1">↑ 5%</span>
                <span>from last month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Upcoming Tasks</h3>
          <div className="space-y-4">
            {employeeStats.upcomingTasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-gray-500">Due: {task.dueDate}</div>
                </div>
                <div className="flex items-center">
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full mt-4 flex items-center justify-center space-x-1 text-purple-600 hover:text-purple-800">
              <span>View All Tasks</span>
              <ChevronRight className="w-4 h-4" />
            </button>
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
            <button className="w-full mt-4 flex items-center justify-center space-x-1 text-purple-600 hover:text-purple-800">
              <span>View All Bookings</span>
              <ChevronRight className="w-4 h-4" />
            </button>
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
                      <button className="text-green-600 hover:text-green-900">
                        <CheckCircle className="w-4 h-4" />
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
        <h2 className="text-2xl font-bold">My Tasks</h2>
        <button className="flex items-center space-x-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
            Pending
          </h3>
          <div className="space-y-3">
            {tasks.filter(task => task.status === 'pending').map(task => (
              <div key={task.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium">{task.title}</div>
                <div className="text-sm text-gray-500 mb-2">{task.description}</div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">Due: {task.dueDate}</div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <button className="text-xs text-purple-600 hover:text-purple-800">Start Task</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            In Progress
          </h3>
          <div className="space-y-3">
            {tasks.filter(task => task.status === 'in-progress').map(task => (
              <div key={task.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium">{task.title}</div>
                <div className="text-sm text-gray-500 mb-2">{task.description}</div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">Due: {task.dueDate}</div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <button className="text-xs text-green-600 hover:text-green-800">Complete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Completed
          </h3>
          <div className="space-y-3">
            {tasks.filter(task => task.status === 'completed').map(task => (
              <div key={task.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium">{task.title}</div>
                <div className="text-sm text-gray-500 mb-2">{task.description}</div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">Due: {task.dueDate}</div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <div className="text-xs text-green-600 flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            <Briefcase className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-bold">Employee Portal</span>
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
                activeTab === 'tasks' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('tasks')}
            >
              <ClipboardCheck className="w-5 h-5" />
              <span>My Tasks</span>
              {activeTab === 'tasks' && <ChevronRight className="w-4 h-4 ml-auto" />}
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
                activeTab === 'feedback' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('feedback')}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Feedback</span>
              {activeTab === 'feedback' && <ChevronRight className="w-4 h-4 ml-auto" />}
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

export default EmployeeDashboard; 