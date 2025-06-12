
import { useState } from 'react';
import { CircleX } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from './ui/input';
import { useRef } from 'react';
import { getImageUrl } from '../services/supabase';


interface CreateJamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateJam: (jamData: { name: string; description: string; photo: string }) => void;
}

const CreateJamModal = ({ isOpen, onClose, onCreateJam }: CreateJamModalProps) => {
  const [jamName, setJamName] = useState('');
  const [jamDescription, setJamDescription] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  if (!isOpen) return null;


  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Selected file:', file);
      
      const url = await getImageUrl(file)

      console.log('Image URL:', url);
      setCoverImage(url);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jamName.trim()) {
      onCreateJam({ name: jamName, description: jamDescription, photo: coverImage || 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/CD_autolev_crop_new.jpg/250px-CD_autolev_crop_new.jpg' });
      setJamName('');
      setJamDescription('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-2xl mx-4 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Create Jam</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <CircleX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-6 mb-6">
            {/* Upload Cover */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 bg-gray-700 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors duration-200 group" onClick={handleUploadClick}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-500 transition-colors duration-200">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm font-medium">{coverImage ? 'Cover uploaded' : 'Upload cover'}</p>
                </div>
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            {/* Form Fields */}
            <div className="flex-1 space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="Name your Jam"
                  value={jamName}
                  onChange={(e) => setJamName(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 text-lg h-14 rounded-xl focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <textarea
                  placeholder="Add an optional description :)"
                  value={jamDescription}
                  onChange={(e) => setJamDescription(e.target.value)}
                  rows={6}
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 resize-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-colors duration-200"
            >
              Create Jam
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJamModal;
