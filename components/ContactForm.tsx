import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Clipboard, Copy, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export type ContactFormProps = {
  open: boolean;
  onClose: () => void;
  serviceName?: string;
};

const CONTACT_CHANNELS = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    value: '+6612345678',
    icon: MessageCircle,
    color: 'text-green-500',
  },
  {
    id: 'wechat',
    name: '微信',
    value: 'hottie_fans',
    icon: MessageCircle,
    color: 'text-green-500',
  },
  {
    id: 'line',
    name: 'Line',
    value: '@hottiefans',
    icon: MessageCircle,
    color: 'text-green-500',
  }
];

export function ContactForm({ open, onClose, serviceName }: ContactFormProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (value: string, id: string) => {
    navigator.clipboard.writeText(value);
    setCopied(id);
    // 显示通知
    alert('已复制到剪贴板');

    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">联系客服</DialogTitle>
          <DialogDescription className="text-center">
            {serviceName ? `预订 ${serviceName}` : '联系我们的客服获取更多信息'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 my-4">
          <div className="flex justify-center mb-2">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-brand/20">
              <Image 
                src="/images/customer-service.jpg" 
                alt="Customer Service"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-4">
            {CONTACT_CHANNELS.map((channel) => (
              <div key={channel.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full bg-muted ${channel.color}`}>
                    <channel.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{channel.name}</p>
                    <p className="text-sm text-muted-foreground">{channel.value}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleCopy(channel.value, channel.id)}
                >
                  {copied === channel.id ? (
                    <Clipboard className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="sm:justify-center gap-2">
          <Button variant="outline" onClick={onClose}>
            稍后联系
          </Button>
          <Button onClick={() => handleCopy(CONTACT_CHANNELS[0].value, 'main')}>
            复制客服联系方式
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 