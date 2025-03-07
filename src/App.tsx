import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { CheckCircle2, XCircle, AlertCircle, Loader2, Info } from 'lucide-react';

function App() {
  const [lastToastType, setLastToastType] = useState<string | null>(null);
  
  const toastTypes = [
    {
      type: 'promise',
      title: 'Loading data',
      description: 'Please wait while we process your request',
      icon: <Loader2 className="w-4 h-4 text-white animate-spin" />
    },
    {
      type: 'info',
      title: 'Information',
      description: 'Here is some useful information',
      icon: <Info className="w-4 h-4 text-blue-500" />
    },
    {
      type: 'success',
      title: 'Successfully saved',
      description: 'Your changes have been saved',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />
    },
    {
      type: 'warning',
      title: 'Warning',
      description: 'Your session will expire soon',
      icon: <AlertCircle className="w-4 h-4 text-yellow-500" />
    },
    {
      type: 'error',
      title: 'Error occurred',
      description: 'Failed to save changes',
      icon: <XCircle className="w-4 h-4 text-red-500" />
    }
  ];

  const getNextToastType = () => {
    if (!lastToastType) {
      setLastToastType('promise');
      return toastTypes[0]; // Start with promise
    }

    const currentIndex = toastTypes.findIndex(t => t.type === lastToastType);
    const nextIndex = (currentIndex + 1) % toastTypes.length;
    setLastToastType(toastTypes[nextIndex].type);
    return toastTypes[nextIndex];
  };

  const showToast = () => {
    const nextType = getNextToastType();
    
    if (nextType.type === 'promise') {
      const promiseFunction = () => new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast.promise(promiseFunction, {
        loading: (
          <div className="w-full animate-fade-in">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-white animate-spin" />
                <span className="text-[15px] font-medium text-white">Loading data...</span>
              </div>
              <p className="text-[14px] text-[rgb(161,161,161)]">Please wait while we process your request</p>
            </div>
          </div>
        ),
        success: (
          <div className="w-full animate-fade-in">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-[15px] font-medium text-white">Data loaded successfully</span>
              </div>
              <p className="text-[14px] text-[rgb(161,161,161)]">Your request has been processed</p>
            </div>
          </div>
        ),
        error: (
          <div className="w-full animate-fade-in">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-[15px] font-medium text-white">Error loading data</span>
              </div>
              <p className="text-[14px] text-[rgb(161,161,161)]">Failed to process your request</p>
            </div>
          </div>
        ),
        style: {
          background: '#111110',
          border: '1px solid rgb(35, 35, 35)',
          color: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
          padding: '12px 16px',
          width: '356px',
          fontFamily: "'Geist Sans', system-ui, sans-serif"
        }
      });
      return;
    }

    toast.custom((t) => (
      <div className="w-full animate-fade-in">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {nextType.icon}
            <span className="text-[15px] font-medium text-white">{nextType.title}</span>
          </div>
          <p className="text-[14px] text-[rgb(161,161,161)]">{nextType.description}</p>
        </div>
      </div>
    ), {
      style: {
        background: '#111110',
        border: '1px solid rgb(35, 35, 35)',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
        padding: '12px 16px',
        width: '356px',
        fontFamily: "'Geist Sans', system-ui, sans-serif"
      }
    });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <button
        onClick={showToast}
        className="px-4 py-2 bg-white rounded-full text-sm font-medium text-black hover:bg-gray-100 transition-colors"
      >
        Add toast
      </button>
      
      <Toaster 
        position="bottom-right"
        expand={false}
        closeButton={false}
        theme="dark"
        visibleToasts={3}
        toastOptions={{
          style: {
            fontFamily: "'Geist Sans', system-ui, sans-serif"
          }
        }}
      />
    </div>
  );
}

export default App;