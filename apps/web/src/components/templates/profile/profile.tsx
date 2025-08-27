'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar';
import { Button } from '@repo/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/card';
import { Input } from '@repo/ui/input';
import { Label } from '@repo/ui/label';
import { Separator } from '@repo/ui/separator';
import { Camera, Key, Link2, Mail, User, X } from 'lucide-react';
import { useState } from 'react';
import { AvatarUploadModal } from './avatar-upload-modal';
import { ChangePasswordModal } from './change-password-modal';

export function ProfileTemplate() {
  const [user, setUser] = useState({
    name: 'João Silva',
    email: 'joao.silva@example.com',
    avatar: '',
    isGoogleLinked: false,
  });

  const [showNameModal, setShowNameModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [isLinkingGoogle, setIsLinkingGoogle] = useState(false);

  const handleLinkGoogle = async () => {
    setIsLinkingGoogle(true);

    // Simular processo de vinculação com Google
    setTimeout(() => {
      setUser((prev) => ({ ...prev, isGoogleLinked: !prev.isGoogleLinked }));
      setIsLinkingGoogle(false);

      //   toast({
      //     title: user.isGoogleLinked ? 'Google desvinculado' : 'Google vinculado',
      //     description: user.isGoogleLinked
      //       ? 'Sua conta foi desvinculada do Google com sucesso.'
      //       : 'Sua conta foi vinculada ao Google com sucesso.',
      //   });
    }, 1500);
  };

  const handleNameUpdate = (newName: string) => {
    setUser((prev) => ({ ...prev, name: newName }));
    // toast({
    //   title: 'Nome atualizado',
    //   description: 'Seu nome foi alterado com sucesso.',
    // });
  };

  const handleAvatarUpdate = (newAvatar: string) => {
    setUser((prev) => ({ ...prev, avatar: newAvatar }));
    // toast({
    //   title: 'Avatar atualizado',
    //   description: 'Sua foto de perfil foi alterada com sucesso.',
    // });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      {/* Seção: Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informações Básicas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                {user.avatar ? (
                  <AvatarImage src={user.avatar || '/placeholder.svg'} alt={user.name} />
                ) : (
                  <AvatarFallback className="text-xl font-semibold">
                    {getInitials(user.name)}
                  </AvatarFallback>
                )}
              </Avatar>
              <Button
                size="sm"
                variant="secondary"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                onClick={() => setShowAvatarModal(true)}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-medium">{user.name}</p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <p>{user.email}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Nome */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Nome Completo</Label>
            <div className="flex gap-2">
              <Input value={user.name} readOnly className="bg-muted" />
              <Button variant="outline" size="default" onClick={() => setShowNameModal(true)}>
                Editar
              </Button>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Email</Label>
            <Input value={user.email} readOnly className="bg-muted" />
            <p className="text-xs text-muted-foreground">
              O email não pode ser alterado após o cadastro
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Segurança */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Segurança
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            size="default"
            className="w-full justify-start bg-transparent"
            onClick={() => setShowPasswordModal(true)}
          >
            <Key className="h-4 w-4" />
            Alterar Senha
          </Button>

          <Separator />

          <div className="space-y-3">
            <Label className="text-sm font-medium">Conta Google</Label>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div
                  className={`h-2 w-2 rounded-full ${user.isGoogleLinked ? 'bg-green-500' : 'bg-gray-400'}`}
                />
                <div>
                  <p className="font-medium">
                    {user.isGoogleLinked ? 'Conta vinculada' : 'Conta não vinculada'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {user.isGoogleLinked
                      ? 'Você pode fazer login usando sua conta Google'
                      : 'Vincule sua conta Google para facilitar o acesso'}
                  </p>
                </div>
              </div>
              <Button
                variant={user.isGoogleLinked ? 'destructive' : 'default'}
                size="sm"
                onClick={handleLinkGoogle}
                disabled={isLinkingGoogle}
              >
                {isLinkingGoogle ? (
                  'Processando...'
                ) : user.isGoogleLinked ? (
                  <>
                    <X className="mr-2 h-4 w-4" />
                    Desvincular
                  </>
                ) : (
                  <>
                    <Link2 className="mr-2 h-4 w-4" />
                    Vincular
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ChangePasswordModal open={showPasswordModal} onOpenChange={setShowPasswordModal} />

      <AvatarUploadModal
        open={showAvatarModal}
        onOpenChange={setShowAvatarModal}
        currentAvatar={user.avatar}
        onAvatarUpdate={handleAvatarUpdate}
      />
    </>
  );
}
