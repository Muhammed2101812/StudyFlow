import React, { useState } from 'react';
import { usePlan } from '../../hooks/usePlan';
import { useUser } from '../../hooks/useUser';
import { useToast } from '../../contexts/ToastContext';
import Button from './Button';
import Modal from './Modal';
import { Upload, FileText, CheckCircle2 } from 'lucide-react';

const PlanImport = ({ isOpen, onClose }) => {
  const { importPlan, switchPlan } = usePlan();
  const { currentUser } = useUser();
  const { toast } = useToast();
  const [importing, setImporting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = async () => {
    try {
      const result = await window.electronAPI.openFileDialog();

      if (result.success && !result.data.canceled && result.data.filePaths.length > 0) {
        setSelectedFile(result.data.filePaths[0]);
      }
    } catch (error) {
      toast.error('Dosya seçilemedi');
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      toast.error('Lütfen bir dosya seçin');
      return;
    }

    setImporting(true);

    try {
      const result = await importPlan(selectedFile);

      if (result.success) {
        toast.success('Plan başarıyla import edildi!');

        // Auto-assign to current user
        if (currentUser) {
          await switchPlan(result.data.id);
        }

        setSelectedFile(null);
        onClose();
      } else {
        toast.error(result.error || 'Plan import edilemedi');
      }
    } catch (error) {
      toast.error('Bir hata oluştu');
    } finally {
      setImporting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <Modal.Header onClose={onClose}>
        Plan Import Et
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              📋 JSON formatında hazırlanmış çalışma planlarını import edebilirsiniz.
              Plan formatı hakkında bilgi için dokümantasyona bakın.
            </p>
          </div>

          {!selectedFile ? (
            <div
              onClick={handleFileSelect}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 hover:bg-primary-50 transition-colors cursor-pointer"
            >
              <Upload size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-700 font-medium mb-1">
                JSON dosyası seçmek için tıklayın
              </p>
              <p className="text-sm text-gray-500">
                .json uzantılı plan dosyası
              </p>
            </div>
          ) : (
            <div className="border border-green-200 bg-green-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={24} className="text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">
                    {selectedFile.split('\\').pop().split('/').pop()}
                  </p>
                  <p className="text-sm text-gray-600">{selectedFile}</p>
                </div>
              </div>
              <CheckCircle2 size={24} className="text-green-600" />
            </div>
          )}

          {selectedFile && (
            <Button
              variant="ghost"
              onClick={handleFileSelect}
              className="w-full"
            >
              Farklı Dosya Seç
            </Button>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            İptal
          </Button>
          <Button
            onClick={handleImport}
            loading={importing}
            disabled={!selectedFile}
          >
            Import Et
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default PlanImport;
