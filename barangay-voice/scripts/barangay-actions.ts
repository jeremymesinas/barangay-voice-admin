import { supabase } from '../utils/supabase';

type Barangay = {
  id: string;
  name: string;
  city: string;
};

export const fetchBarangayById = async (barangay_id: string): Promise<Barangay | null> => {
    try {
      console.log('Querying Supabase for barangay ID:', barangay_id);
      
      const { data, error } = await supabase
        .from('barangays')
        .select('id, name, city')
        .eq('id', barangay_id)
        .single();
  
      console.log('Supabase response:', { data, error });
  
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
  
      if (!data) {
        console.warn('No data returned for barangay ID:', barangay_id);
        return null;
      }
  
      return data;
    } catch (error) {
      console.error('Error in fetchBarangayById:', error);
      return null;
    }
  };

// Bonus: Function to fetch all barangays (might be useful later)
export const fetchAllBarangays = async (): Promise<Barangay[]> => {
  const { data, error } = await supabase
    .from('barangays')
    .select('id, name, city');

  if (error) {
    console.error('Error fetching barangays:', error);
    return [];
  }

  return data || [];
};