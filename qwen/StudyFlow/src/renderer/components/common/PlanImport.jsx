import React, { useState } from 'react';
import Modal from '../components/common/Modal.jsx';
import Button from '../components/common/Button.jsx';

const PlanImport = ({ isOpen, onClose, onImport }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleFileSelect = (file) => {
    if (file) {
      if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
        setError('Lütfen bir JSON dosyası seçin');
        return;
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB
        setError('Dosya boyutu 10MB\'tan küçük olmalıdır');
        return;
      }

      setSelectedFile(file);
      setError('');
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      setError('Lütfen bir dosya seçin');
      return;
    }

    setIsImporting(true);
    setError('');

    try {
      const text = await selectedFile.text();
      const plan = JSON.parse(text);

      // Basic validation
      if (!plan.id || !plan.name || !plan.examDate || !plan.subjects || !plan.stages) {
        throw new Error('Geçersiz plan formatı');
      }

      // Call the import function passed from parent
      await onImport(selectedFile.path || URL.createObjectURL(selectedFile));
      onClose();
    } catch (err) {
      console.error('Plan import error:', err);
      setError(err.message || 'Plan içeri aktarılırken bir hata oluştu');
    } finally {
      setIsImporting(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Plan İçe Aktar">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload').click()}
      >
        <div className="text-4xl mb-3">📁</div>
        <p className="text-gray-600 mb-2">
          {selectedFile ? selectedFile.name : 'Bir JSON dosyası sürükleyin veya tıklayarak seçin'}
        </p>
        <p className="text-sm text-gray-500">Max 10MB - Sadece JSON dosyaları</p>
        
        <input
          id="file-upload"
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="mt-6 flex justify-end space-x-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          disabled={isImporting}
        >
          İptal
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={handleImport}
          loading={isImporting}
          disabled={!selectedFile || isImporting}
        >
          {isImporting ? 'İçe Aktarılıyor...' : 'Planı İçe Aktar'}
        </Button>
      </div>
    </Modal>
  );
};

export default PlanImport;