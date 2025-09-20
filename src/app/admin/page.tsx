
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { db, auth } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, Timestamp, doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, LogOut, Search, Check, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Business {
  id: string;
  businessName: string;
  email: string;
  status: 'pending' | 'active' | 'rejected';
  createdAt: Timestamp;
}

export default function AdminDashboardPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const router = useRouter();

  // Check authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setIsCheckingAuth(false);
      } else {
        setIsAuthenticated(false);
        setIsCheckingAuth(false);
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchBusinesses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const businessesCollection = collection(db, 'businesses');
        const q = query(businessesCollection, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const businessesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Business, 'id'>)
        }));
        setBusinesses(businessesList);
        setFilteredBusinesses(businessesList);
      } catch (err) {
        console.error("Error fetching businesses: ", err);
        setError('Failed to fetch business applications. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, [isAuthenticated]);

  // Filter businesses based on search term and status
  useEffect(() => {
    let filtered = businesses;

    // Filter by search term (business name or email)
    if (searchTerm) {
      filtered = filtered.filter(business =>
        business.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(business => business.status === statusFilter);
    }

    setFilteredBusinesses(filtered);
  }, [businesses, searchTerm, statusFilter]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleStatusUpdate = async (businessId: string, newStatus: Business['status']) => {
    setIsUpdating(businessId);
    try {
      const businessRef = doc(db, 'businesses', businessId);
      await updateDoc(businessRef, { status: newStatus });

      // Update local state
      setBusinesses(prev =>
        prev.map(business =>
          business.id === businessId
            ? { ...business, status: newStatus }
            : business
        )
      );
    } catch (error) {
      console.error('Error updating business status:', error);
      setError('Failed to update business status. Please try again.');
    } finally {
      setIsUpdating(null);
    }
  };

  const getBadgeVariant = (status: Business['status']) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  // Show loading spinner while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-secondary">
        <Loader2 className="h-12 w-12 animate-spin text-black" />
        <p className="mt-4 font-solway text-black">Checking authentication...</p>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-secondary p-4 sm:p-8 pt-24 relative">
      <div className="absolute top-4 left-4">
        <Button asChild variant="outline">
          <Link href="/">&larr; Back to Home</Link>
        </Button>
      </div>
      <div className="absolute top-4 right-4">
        <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
      <Card className="w-full max-w-6xl mt-12 bg-white border-black border-4 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-black">Admin Dashboard</CardTitle>
          <CardDescription className="font-solway text-black/80">
            Review and manage business applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by business name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 bg-white text-black border-black rounded-lg"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px] border-2 bg-white text-black border-black rounded-lg">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-12 w-12 animate-spin text-black" />
            </div>
          ) : error ? (
            <div className="text-center py-16 text-red-600 font-solway">{error}</div>
          ) : businesses.length === 0 ? (
            <div className="text-center py-16 text-black/80 font-solway">No applications found.</div>
          ) : filteredBusinesses.length === 0 ? (
            <div className="text-center py-16 text-black/80 font-solway">No businesses match your filters.</div>
          ) : (
            <div className="border-2 border-black rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-100">
                  <TableRow className="border-b-2 border-black">
                    <TableHead className="w-[250px] font-bold text-black font-solway">Business Name</TableHead>
                    <TableHead className="font-bold text-black font-solway">Email</TableHead>
                    <TableHead className="font-bold text-black font-solway text-center">Status</TableHead>
                    <TableHead className="font-bold text-black font-solway text-center">Actions</TableHead>
                    <TableHead className="font-bold text-black font-solway text-right">Applied On</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBusinesses.map((business) => (
                    <TableRow key={business.id} className="font-solway even:bg-white odd:bg-gray-50 border-b-2 border-black last:border-b-0">
                      <TableCell className="font-medium text-black">{business.businessName}</TableCell>
                      <TableCell className="text-black/80">{business.email}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={getBadgeVariant(business.status)} className="capitalize">
                          {business.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex gap-2 justify-center">
                          {business.status !== 'active' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusUpdate(business.id, 'active')}
                              disabled={isUpdating === business.id}
                              className="h-8 px-3 bg-green-600 text-white"
                            >
                              {isUpdating === business.id ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <><Check className="h-3 w-3" /> </>
                              )}
                            </Button>
                          )}
                          {business.status !== 'rejected' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusUpdate(business.id, 'rejected')}
                              disabled={isUpdating === business.id}
                              className="h-8 px-3 bg-red-600 textwhite border-red-600 hover:bg-red-50"
                            >
                              {isUpdating === business.id ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <><X className="h-3 w-3" /> </>
                              )}
                            </Button>
                          )}
                          {business.status !== 'pending' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusUpdate(business.id, 'pending')}
                              disabled={isUpdating === business.id}
                              className="h-8 px-3 bg bg-yellow-500 text-white border-yellow-600 hover:bg-yellow-50"
                            >
                              {isUpdating === business.id ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <><Clock className="h-3 w-3" /> </>
                              )}
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-black/80">
                        {business.createdAt?.toDate().toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
