import Delivery from '../models/Delivery';
import File from '../models/File';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';

import DeliveryRegistrationMail from '../jobs/DeliveryRegistrationMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    // TODO: add a page system here
    const deliveries = await Delivery.findAll({
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      include: [
        { model: File, as: 'signature', attributes: ['id', 'path', 'url'] },
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zipCode',
          ],
        },
      ],
    });

    if (!deliveries || deliveries.length <= 0) {
      res.status(404).json({ error: 'Deliveries not found' });
    }

    return res.json(deliveries);
  }

  async store(req, res) {
    const { deliveryman_id, recipient_id } = req.body;
    const deliveryman = await DeliveryMan.findByPk(deliveryman_id);

    if (!deliveryman) {
      res.status(404).json({ error: 'Delivery man not found' });
    }

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      res.status(404).json({ error: 'Recipient not found' });
    }

    const delivery = await Delivery.create(req.body);

    await Queue.add(DeliveryRegistrationMail.key, {
      delivery,
      deliveryman,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const delivery = await Delivery.findOne({
      where: { id: req.params.id },
    });

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    // TODO: remove the req.body and send a correct object
    await delivery.update(req.body);

    const deliveryUpdated = await Delivery.findByPk(req.params.id, {
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      include: [
        { model: File, as: 'signature', attributes: ['id', 'path', 'url'] },
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zipCode',
          ],
        },
      ],
    });

    return res.json(deliveryUpdated);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryRows = await Delivery.destroy({ where: { id } });

    if (deliveryRows <= 0) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    return res.status(204).send();
  }
}

export default new DeliveryController();
