<?php
namespace App\Service\Email;

use App\Entity\User;

class Email
{
    private $sender;
    private $mailer;
    private $templating;

    public function __construct($sender, \Swift_Mailer $mailer, \Twig\Environment $templating)
    {
        $this->sender       = $sender;
        $this->mailer       = $mailer;
        $this->templating   = $templating;
    }

    public function sendOrder($order, $items, $email)
    {
        $message = $this->sendMessage(
            $email,
            $order->getUser()->getName() . " : Commande pour le " . ($order->getDeliveryDate()->format('d/m/Y')),
            "email/order/newOrder.html.twig",
            ['order' => $order, 'items' => $items, 'supplier' => $items[0]->getSupplier()]
        );
        return $message;
    }

    private function sendMessage(string $sendTo, string $subject, string $template, array $args)
    {
        try {
            $status = '';
            $message = new \Swift_Message();
            $message->setSubject($subject)
                    ->setFrom($this->sender)
                    ->setTo($sendTo)
                    ->setBody($this->templating->render($template, $args), 'text/html');
        } catch (\Exception $e) {
            $status = 'failed';
        } finally {
            return $status !== 'failed' ? $this->mailer->send($message) : '';
        }
    }

    private function sendHiddenMessage($sendTo, string $subject, string $template, array $args)
    {
        try {
            $status = '';
            $message = new \Swift_Message();
            $message->setSubject($subject)
                    ->setFrom($this->sender)
                    ->setBcc($sendTo)
                    ->setBody($this->templating->render($template, $args), 'text/html');
        } catch (\Exception $e) {
            $status = 'failed';
        } finally {
            return $status !== 'failed' ? $this->mailer->send($message) : '';
        }
    }
}